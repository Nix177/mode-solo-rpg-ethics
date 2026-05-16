# Directional combat v1 audit

Date: 2026-05-15

## Output

Created non-destructive candidate combat sheets under:

`action_rpg_mode/assets/imagegen_generated/directional_combat_v1/`

For each class:

- `attack_basic`
- `skill_1`
- `skill_2`

Each action contains:

- 8 per-direction strips: `down`, `down_right`, `right`, `up_right`, `up`, `up_left`, `left`, `down_left`
- 1 assembled sheet: `{class}_{action}_8dir_sheet_v1.png`

## Format

- 8 rows x 6 columns
- 256 x 256 px per frame
- Transparent PNG
- Direction order compatible with game.js:
  - down
  - downRight
  - right
  - upRight
  - up
  - upLeft
  - left
  - downLeft

## Method

These are not free-form regenerated character sheets. They preserve the active player model by using existing source frames from:

`action_rpg_mode/assets/sprite_frames/player/{class}/walk/{direction}/01..06.png`

Weapon/spell effects are composited from generated FX assets in:

`action_rpg_mode/assets/imagegen_generated/fx/named_v1/`

## Result

- Missing directions from the previous generated attack sheets are now present.
- Model identity remains consistent because source frames are reused.
- These are safer integration candidates than the previous `1254 x 1254` imagegen sheets.

## Remaining quality note

This is a reliable prototype/production-candidate pass, not final hand-drawn AAA animation. For final polish, each row could be redrawn by an artist or generated as strict per-direction 6-frame strips from these outputs as references.
