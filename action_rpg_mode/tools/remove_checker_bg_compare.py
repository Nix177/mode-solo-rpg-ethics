import json
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(r"D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode")
SRC_ROOT = ROOT / "assets" / "spritesheets"
COMPARE_ROOT = ROOT / "assets" / "bg_removal_compare"
CLEAN_ROOT = ROOT / "assets" / "spritesheets_cleaned"
REPORTS_ROOT = ROOT / "assets" / "reports"

BORDER_STRIDE = 8


@dataclass
class Metric:
    relpath: str
    method: str
    fg_ratio: float
    border_fg_ratio: float
    components: int


def list_pngs(root: Path):
    return sorted(root.rglob("*.png"))


def border_connected(mask: np.ndarray) -> np.ndarray:
    h, w = mask.shape
    visited = np.zeros_like(mask, dtype=np.uint8)
    q = []

    for x in range(w):
        if mask[0, x]:
            q.append((0, x))
        if mask[h - 1, x]:
            q.append((h - 1, x))
    for y in range(h):
        if mask[y, 0]:
            q.append((y, 0))
        if mask[y, w - 1]:
            q.append((y, w - 1))

    head = 0
    while head < len(q):
        y, x = q[head]
        head += 1
        if y < 0 or y >= h or x < 0 or x >= w:
            continue
        if visited[y, x] or not mask[y, x]:
            continue
        visited[y, x] = 1
        q.append((y - 1, x))
        q.append((y + 1, x))
        q.append((y, x - 1))
        q.append((y, x + 1))

    return visited.astype(bool)


def alpha_cleanup(alpha: np.ndarray, min_area: int = 12) -> np.ndarray:
    fg = (alpha > 0).astype(np.uint8)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(fg, connectivity=8)
    clean = np.zeros_like(fg)
    for i in range(1, n):
        area = int(stats[i, cv2.CC_STAT_AREA])
        if area >= min_area:
            clean[labels == i] = 1
    return (clean * 255).astype(np.uint8)


def method_a_flood(img_bgr: np.ndarray) -> np.ndarray:
    h, w = img_bgr.shape[:2]
    work = img_bgr.copy()
    mask = np.zeros((h + 2, w + 2), dtype=np.uint8)

    seeds = []
    for x in range(0, w, BORDER_STRIDE):
        seeds.append((x, 0))
        seeds.append((x, h - 1))
    for y in range(0, h, BORDER_STRIDE):
        seeds.append((0, y))
        seeds.append((w - 1, y))

    flags = 4 | cv2.FLOODFILL_FIXED_RANGE | (255 << 8)
    lo = (24, 24, 24)
    hi = (24, 24, 24)

    for sx, sy in seeds:
        if mask[sy + 1, sx + 1] != 0:
            continue
        cv2.floodFill(work, mask, (sx, sy), (0, 0, 0), lo, hi, flags)

    bg = mask[1:-1, 1:-1] > 0
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha = alpha_cleanup(alpha)
    return alpha


def method_b_hsv(img_bgr: np.ndarray) -> np.ndarray:
    hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    sat = hsv[:, :, 1]
    val = hsv[:, :, 2]

    candidate_bg = (sat < 36) & (val > 95) & (val < 245)
    bg = border_connected(candidate_bg)

    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha = alpha_cleanup(alpha)
    return alpha


def alpha_metrics(alpha: np.ndarray):
    fg = (alpha > 0)
    fg_ratio = float(fg.mean())
    border = np.concatenate([
        fg[0, :],
        fg[-1, :],
        fg[:, 0],
        fg[:, -1],
    ])
    border_fg_ratio = float(border.mean())

    n, _, stats, _ = cv2.connectedComponentsWithStats(fg.astype(np.uint8), connectivity=8)
    components = max(0, n - 1)
    return fg_ratio, border_fg_ratio, components


def rgba_from_alpha(img_bgr: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    bgra = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha
    return bgra


def composite_preview(img_bgr: np.ndarray, alpha: np.ndarray, bg_color=(24, 24, 24)) -> np.ndarray:
    h, w = img_bgr.shape[:2]
    bg = np.full((h, w, 3), bg_color, dtype=np.uint8)
    a = (alpha.astype(np.float32) / 255.0)[:, :, None]
    comp = (img_bgr.astype(np.float32) * a + bg.astype(np.float32) * (1 - a)).astype(np.uint8)
    return comp


def choose_method(metrics_a: Metric, metrics_b: Metric) -> str:
    target = 0.17

    def score(m: Metric):
        return (
            m.border_fg_ratio * 4.0
            + abs(m.fg_ratio - target) * 0.9
            + (0.08 if m.fg_ratio > 0.35 else 0.0)
            + (0.06 if m.fg_ratio < 0.03 else 0.0)
        )

    sa = score(metrics_a)
    sb = score(metrics_b)
    return "A" if sa <= sb else "B"


def pick_samples(all_files):
    wanted = [
        "player/warrior/walk.png",
        "player/mage/attack_basic.png",
        "player/hunter/skill_2.png",
        "enemies/raider/attack.png",
        "enemies/drone/walk.png",
        "enemies/juggernaut/death.png",
        "enemies/stalker/idle.png",
    ]
    index = {str(p.relative_to(SRC_ROOT)).replace('\\', '/'): p for p in all_files}
    result = [index[w] for w in wanted if w in index]
    return result


def main():
    if not SRC_ROOT.exists():
        raise SystemExit(f"Missing source: {SRC_ROOT}")

    REPORTS_ROOT.mkdir(parents=True, exist_ok=True)
    COMPARE_ROOT.mkdir(parents=True, exist_ok=True)
    CLEAN_ROOT.mkdir(parents=True, exist_ok=True)

    all_files = list_pngs(SRC_ROOT)
    sample_files = pick_samples(all_files)

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    cmp_dir = COMPARE_ROOT / f"run_{ts}"
    a_dir = cmp_dir / "method_a"
    b_dir = cmp_dir / "method_b"
    p_dir = cmp_dir / "preview"
    a_dir.mkdir(parents=True, exist_ok=True)
    b_dir.mkdir(parents=True, exist_ok=True)
    p_dir.mkdir(parents=True, exist_ok=True)

    sample_results = []

    # sample comparison
    for src in sample_files:
        rel = src.relative_to(SRC_ROOT)
        rel_s = str(rel).replace("\\", "/")
        img = cv2.imread(str(src), cv2.IMREAD_COLOR)
        if img is None:
            continue

        alpha_a = method_a_flood(img)
        alpha_b = method_b_hsv(img)

        m_a = Metric(relpath=rel_s, method="A", fg_ratio=0, border_fg_ratio=0, components=0)
        m_b = Metric(relpath=rel_s, method="B", fg_ratio=0, border_fg_ratio=0, components=0)
        m_a.fg_ratio, m_a.border_fg_ratio, m_a.components = alpha_metrics(alpha_a)
        m_b.fg_ratio, m_b.border_fg_ratio, m_b.components = alpha_metrics(alpha_b)

        pick = choose_method(m_a, m_b)

        out_a = a_dir / rel
        out_b = b_dir / rel
        out_a.parent.mkdir(parents=True, exist_ok=True)
        out_b.parent.mkdir(parents=True, exist_ok=True)

        cv2.imwrite(str(out_a), rgba_from_alpha(img, alpha_a))
        cv2.imwrite(str(out_b), rgba_from_alpha(img, alpha_b))

        pa = composite_preview(img, alpha_a)
        pb = composite_preview(img, alpha_b)
        # Original + A + B
        sep = np.full((img.shape[0], 8, 3), 40, dtype=np.uint8)
        panel = np.concatenate([img, sep, pa, sep, pb], axis=1)
        out_prev = p_dir / rel.with_suffix(".preview.png")
        out_prev.parent.mkdir(parents=True, exist_ok=True)
        cv2.imwrite(str(out_prev), panel)

        sample_results.append({
            "file": rel_s,
            "method_a": asdict(m_a),
            "method_b": asdict(m_b),
            "picked": pick,
            "preview": str(out_prev),
        })

    # global pick from sample votes
    votes_a = sum(1 for x in sample_results if x["picked"] == "A")
    votes_b = sum(1 for x in sample_results if x["picked"] == "B")
    chosen = "A" if votes_a >= votes_b else "B"

    # batch clean with chosen method
    batch_metrics = []
    cleaned_dir = CLEAN_ROOT / f"run_{ts}_method_{chosen.lower()}"
    cleaned_dir.mkdir(parents=True, exist_ok=True)

    for src in all_files:
        rel = src.relative_to(SRC_ROOT)
        rel_s = str(rel).replace("\\", "/")
        img = cv2.imread(str(src), cv2.IMREAD_COLOR)
        if img is None:
            continue

        alpha = method_a_flood(img) if chosen == "A" else method_b_hsv(img)
        m = Metric(relpath=rel_s, method=chosen, fg_ratio=0, border_fg_ratio=0, components=0)
        m.fg_ratio, m.border_fg_ratio, m.components = alpha_metrics(alpha)
        batch_metrics.append(asdict(m))

        out = cleaned_dir / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        cv2.imwrite(str(out), rgba_from_alpha(img, alpha))

    report = {
        "timestamp": ts,
        "source_root": str(SRC_ROOT),
        "compare_root": str(cmp_dir),
        "cleaned_root": str(cleaned_dir),
        "sample_votes": {"A": votes_a, "B": votes_b},
        "chosen_method": chosen,
        "sample_results": sample_results,
        "batch_count": len(batch_metrics),
        "batch_metrics": batch_metrics,
    }

    report_json = REPORTS_ROOT / f"bg_removal_compare_{ts}.json"
    report_md = REPORTS_ROOT / f"bg_removal_compare_{ts}.md"

    report_json.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = [
        "# Checkerboard Background Removal - Compare",
        "",
        f"- Timestamp: `{ts}`",
        f"- Compared samples: `{len(sample_results)}`",
        f"- Votes: A=`{votes_a}` | B=`{votes_b}`",
        f"- Chosen method for batch: `{chosen}`",
        f"- Cleaned output root: `{cleaned_dir}`",
        f"- Compare preview root: `{p_dir}`",
        "",
        "## Sample Picks",
    ]

    for s in sample_results:
        lines.append(f"- `{s['file']}` -> picked `{s['picked']}`")

    report_md.write_text("\n".join(lines), encoding="utf-8")

    print(f"Compare root: {cmp_dir}")
    print(f"Chosen method: {chosen} (A votes={votes_a}, B votes={votes_b})")
    print(f"Cleaned root: {cleaned_dir}")
    print(f"Report JSON: {report_json}")
    print(f"Report MD: {report_md}")


if __name__ == "__main__":
    main()
