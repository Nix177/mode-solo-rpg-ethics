import json
import shutil
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path

import cv2

ROWS = 4
COLS = 6
ROW_NAMES = ["down", "left", "right", "up"]
EXPECTED_W = 576
EXPECTED_H = 384
EXPECTED_CELL_W = 96
EXPECTED_CELL_H = 96

ROOT = Path(r"D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode")
SPRITESHEETS_ROOT = ROOT / "assets" / "spritesheets"
SLICED_ROOT = ROOT / "assets" / "spritesheets_sliced"
BACKUP_PARENT = ROOT / "assets" / "backup_assets"
REPORTS_DIR = ROOT / "assets" / "reports"


@dataclass
class SheetReport:
    source: str
    width: int
    height: int
    expected_size_ok: bool
    grid_ok: bool
    cell_w: int
    cell_h: int
    expected_cell_ok: bool
    slices_written: int
    status: str
    notes: str


def main() -> int:
    if not SPRITESHEETS_ROOT.exists():
        print(f"Missing spritesheets root: {SPRITESHEETS_ROOT}")
        return 1

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_root = BACKUP_PARENT / f"spritesheets_originals_{timestamp}"
    backup_root.mkdir(parents=True, exist_ok=True)
    SLICED_ROOT.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    reports = []
    total_slices = 0

    png_files = sorted(SPRITESHEETS_ROOT.rglob("*.png"))
    for src in png_files:
        rel = src.relative_to(SPRITESHEETS_ROOT)

        backup_target = backup_root / rel
        backup_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, backup_target)

        img = cv2.imread(str(src), cv2.IMREAD_UNCHANGED)
        if img is None:
            reports.append(
                SheetReport(
                    source=str(rel).replace("\\", "/"),
                    width=0,
                    height=0,
                    expected_size_ok=False,
                    grid_ok=False,
                    cell_w=0,
                    cell_h=0,
                    expected_cell_ok=False,
                    slices_written=0,
                    status="read_error",
                    notes="cv2 failed to read file",
                )
            )
            continue

        h, w = img.shape[:2]

        expected_size_ok = (w == EXPECTED_W and h == EXPECTED_H)
        grid_ok = (w % COLS == 0 and h % ROWS == 0)
        cell_w = (w // COLS) if grid_ok else 0
        cell_h = (h // ROWS) if grid_ok else 0
        expected_cell_ok = (cell_w == EXPECTED_CELL_W and cell_h == EXPECTED_CELL_H) if grid_ok else False

        slices_written = 0
        status = "ok"
        notes = ""

        if not grid_ok:
            status = "invalid_grid"
            notes = f"Dimensions not divisible by {COLS}x{ROWS}."
        else:
            out_anim_dir = SLICED_ROOT / rel.parent / rel.stem
            out_anim_dir.mkdir(parents=True, exist_ok=True)

            for r in range(ROWS):
                direction = ROW_NAMES[r]
                dir_out = out_anim_dir / direction
                dir_out.mkdir(parents=True, exist_ok=True)

                for c in range(COLS):
                    left = c * cell_w
                    top = r * cell_h
                    right = left + cell_w
                    bottom = top + cell_h

                    frame = img[top:bottom, left:right]
                    frame_name = f"{direction}_{c+1:02d}.png"
                    ok = cv2.imwrite(str(dir_out / frame_name), frame)
                    if ok:
                        slices_written += 1

            if not expected_size_ok or not expected_cell_ok:
                status = "sliced_with_warning"
                notes = (
                    f"Sliced successfully but expected 576x384 (cell 96x96). "
                    f"Found {w}x{h} (cell {cell_w}x{cell_h})."
                )

        total_slices += slices_written
        reports.append(
            SheetReport(
                source=str(rel).replace("\\", "/"),
                width=w,
                height=h,
                expected_size_ok=expected_size_ok,
                grid_ok=grid_ok,
                cell_w=cell_w,
                cell_h=cell_h,
                expected_cell_ok=expected_cell_ok,
                slices_written=slices_written,
                status=status,
                notes=notes,
            )
        )

    summary = {
        "timestamp": timestamp,
        "spritesheets_root": str(SPRITESHEETS_ROOT),
        "backup_root": str(backup_root),
        "sliced_root": str(SLICED_ROOT),
        "expected": {
            "rows": ROWS,
            "cols": COLS,
            "width": EXPECTED_W,
            "height": EXPECTED_H,
            "cell_width": EXPECTED_CELL_W,
            "cell_height": EXPECTED_CELL_H,
        },
        "total_files": len(reports),
        "total_slices_written": total_slices,
        "status_count": {
            "ok": sum(1 for r in reports if r.status == "ok"),
            "sliced_with_warning": sum(1 for r in reports if r.status == "sliced_with_warning"),
            "invalid_grid": sum(1 for r in reports if r.status == "invalid_grid"),
            "read_error": sum(1 for r in reports if r.status == "read_error"),
        },
    }

    report_json = {
        "summary": summary,
        "files": [asdict(r) for r in reports],
    }

    json_path = REPORTS_DIR / f"spritesheet_validation_{timestamp}.json"
    md_path = REPORTS_DIR / f"spritesheet_validation_{timestamp}.md"

    json_path.write_text(json.dumps(report_json, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = [
        "# Spritesheet Validation Report",
        "",
        f"- Timestamp: `{timestamp}`",
        f"- Total files: `{summary['total_files']}`",
        f"- Total slices written: `{summary['total_slices_written']}`",
        f"- Backup root: `{summary['backup_root']}`",
        f"- Sliced root: `{summary['sliced_root']}`",
        "",
        "## Status",
        f"- ok: `{summary['status_count']['ok']}`",
        f"- sliced_with_warning: `{summary['status_count']['sliced_with_warning']}`",
        f"- invalid_grid: `{summary['status_count']['invalid_grid']}`",
        f"- read_error: `{summary['status_count']['read_error']}`",
        "",
        "## Files",
        "| Source | Size | Cell | Status | Notes |",
        "|---|---:|---:|---|---|",
    ]

    for r in reports:
        size = f"{r.width}x{r.height}" if r.width and r.height else "-"
        cell = f"{r.cell_w}x{r.cell_h}" if r.grid_ok else "-"
        notes = r.notes or ""
        lines.append(f"| `{r.source}` | `{size}` | `{cell}` | `{r.status}` | {notes} |")

    md_path.write_text("\n".join(lines), encoding="utf-8")

    print(f"Backup root: {backup_root}")
    print(f"Sliced root: {SLICED_ROOT}")
    print(f"Report JSON: {json_path}")
    print(f"Report MD: {md_path}")
    print(f"Total files: {len(reports)} | Total slices: {total_slices}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
