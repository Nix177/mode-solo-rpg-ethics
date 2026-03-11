# Sample Alternative Slicing Check (Not Full Batch)

Date: 2026-03-11

## Scope
Only 3 spritesheets were inspected and sliced (as requested):
- `player/warrior/walk.png`
- `player/mage/attack_basic.png`
- `enemies/raider/attack.png`

## Findings
- All tested files are `640x640`.
- They are **not** valid for strict `4x6` slicing with integer cell size.
- Visual inspection shows a consistent **6x6 layout**.
- Clean alternative slicing that works on this sample:
  - Use 6 columns x 6 rows
  - Use split boundaries from `linspace` + rounding:
    - x/y cuts: `[0, 107, 213, 320, 427, 533, 640]`
  - This yields near-uniform cell sizes (`106` or `107`) and good visual crop.

## Output generated
- Root: `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets_sliced_alt_samples`
- Per sample:
  - `...\<sample>\grid6x6\r1_c1.png ... r6_c6.png`
  - `...\<sample>\first4rows_6cols\r1_c1.png ... r4_c6.png`

## Important note
- The checkerboard background appears embedded in the images (not transparent alpha in source).
- So slicing is clean spatially, but **background cleanup** still needs a dedicated pass (or regeneration with true transparency).

## Originals safety
- Originals were not modified.
- Full originals backup already exists in:
  - `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\backup_assets\spritesheets_originals_20260311_094355`
