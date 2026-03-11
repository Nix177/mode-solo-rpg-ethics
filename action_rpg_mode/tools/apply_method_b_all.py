import json
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
import shutil

import cv2
import numpy as np

ROOT = Path(r"D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode")
SRC_ROOT = ROOT / "assets" / "spritesheets"
CLEAN_ROOT = ROOT / "assets" / "spritesheets_cleaned"
BACKUP_ROOT = ROOT / "assets" / "backup_assets"
REPORTS_ROOT = ROOT / "assets" / "reports"


@dataclass
class Metric:
    relpath: str
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
    border = np.concatenate([fg[0, :], fg[-1, :], fg[:, 0], fg[:, -1]])
    border_fg_ratio = float(border.mean())

    n, _, _, _ = cv2.connectedComponentsWithStats(fg.astype(np.uint8), connectivity=8)
    components = max(0, n - 1)
    return fg_ratio, border_fg_ratio, components


def rgba_from_alpha(img_bgr: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    bgra = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha
    return bgra


def main():
    if not SRC_ROOT.exists():
        raise SystemExit(f"Missing source root: {SRC_ROOT}")

    REPORTS_ROOT.mkdir(parents=True, exist_ok=True)
    CLEAN_ROOT.mkdir(parents=True, exist_ok=True)
    BACKUP_ROOT.mkdir(parents=True, exist_ok=True)

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    files = list_pngs(SRC_ROOT)

    run_clean = CLEAN_ROOT / f"run_{ts}_method_b"
    run_backup = BACKUP_ROOT / f"spritesheets_method_b_originals_{ts}"
    run_clean.mkdir(parents=True, exist_ok=True)
    run_backup.mkdir(parents=True, exist_ok=True)

    processed = 0
    skipped = 0
    metrics = []

    for src in files:
        rel = src.relative_to(SRC_ROOT)
        rel_s = str(rel).replace("\\", "/")
        img = cv2.imread(str(src), cv2.IMREAD_COLOR)
        if img is None:
            skipped += 1
            continue

        alpha = method_b_hsv(img)
        fg_ratio, border_fg_ratio, components = alpha_metrics(alpha)
        metrics.append(asdict(Metric(relpath=rel_s, fg_ratio=fg_ratio, border_fg_ratio=border_fg_ratio, components=components)))

        out_clean = run_clean / rel
        out_clean.parent.mkdir(parents=True, exist_ok=True)
        cleaned = rgba_from_alpha(img, alpha)
        cv2.imwrite(str(out_clean), cleaned)

        out_backup = run_backup / rel
        out_backup.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, out_backup)

        cv2.imwrite(str(src), cleaned)
        processed += 1

    report = {
        "timestamp": ts,
        "method": "B",
        "source_root": str(SRC_ROOT),
        "cleaned_output": str(run_clean),
        "backup_originals": str(run_backup),
        "processed": processed,
        "skipped": skipped,
        "metrics": metrics,
    }

    report_json = REPORTS_ROOT / f"bg_removal_method_b_apply_{ts}.json"
    report_md = REPORTS_ROOT / f"bg_removal_method_b_apply_{ts}.md"
    report_json.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    md_lines = [
        "# Method B Apply (All Spritesheets)",
        "",
        f"- Timestamp: `{ts}`",
        f"- Source: `{SRC_ROOT}`",
        f"- Processed: `{processed}`",
        f"- Skipped: `{skipped}`",
        f"- Backup originals: `{run_backup}`",
        f"- Cleaned output: `{run_clean}`",
        "",
        "## Notes",
        "- Méthode forcée: B (HSV + border connected + alpha cleanup)",
        "- Les sources ont été remplacées in-place après backup.",
    ]
    report_md.write_text("\n".join(md_lines), encoding="utf-8")

    print(json.dumps({
        "ok": True,
        "method": "B",
        "processed": processed,
        "skipped": skipped,
        "backup": str(run_backup),
        "cleaned": str(run_clean),
        "report_json": str(report_json),
        "report_md": str(report_md),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
