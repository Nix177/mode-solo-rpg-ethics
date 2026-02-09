# Asset Generation Pack (Pixel Prototype)

All assets below are for:
`H:/projet philo bnf/mode_solo/pixel_prototype/assets/`

## 1) Required by current code

### `player_presets.png`
- Size/format: spritesheet `32x32` tiles, transparent background.
- Layout: `10` presets horizontally, each preset has `3 frames x 4 rows` (`down,left,right,up`).
- Prompt:
`Top-down pixel art RPG character sheet, tile size 32x32, 10 distinct protagonist presets side-by-side, each preset has 3 walk frames and 4 directions (down, left, right, up), readable silhouettes, cyberpunk + civic + casual + futurist outfits, transparent background, consistent palette, no text.`

### `npcs.png`
- Size/format: spritesheet `32x32` tiles, transparent background.
- Layout used now: first row, 3 advisors, each with at least 1 readable idle frame in sequence.
- Prompt:
`Top-down pixel art NPC sheet, tile size 32x32, three advisors (cold strategist, idealist poet, critical skeptic), coherent with sci-fi ethical RPG, clean outlines, high readability, transparent background, no text.`

### `tilesets_nature.png`
### `tilesets_urbain.png`
### `tilesets_laboratoire.png`
### `tilesets_espace.png`
### `tilesets_bureaucratie.png`
- Size/format: single-row tile strips, tile size `32x32`, transparent allowed.
- Exact tile order required by code:
  1. floor
  2. wall
  3. door_closed
  4. door_open
  5. terminal
  6. alt_prop
  7. liquid_or_hazard
  8. altar
- Prompt template:
`Top-down pixel art tileset strip, 8 tiles in one row, tile size 32x32. Order: floor, wall, closed door, open door, terminal, alternative prop, liquid/hazard, altar. Theme: [NATURE|URBAN CYBERPUNK|LABORATORY MEDICAL|SPACE SCI-FI|BUREAUCRATIC MONUMENTAL]. Strong contrast, game-ready readability, transparent background, no text.`

## 2) Optional extensions (next pass)

### `decor_[theme].png`
- Suggested placement: `assets/decor_nature.png`, etc.
- Suggested content: extra props for map richness (plants, crates, lamps, banners, pipes).
- Prompt:
`Top-down pixel art decor sheet, 32x32 tiles, 24 unique props for [THEME], readable from gameplay distance, no characters, transparent background, no text.`

### `vfx_ui.png`
- Suggested content: sparkles, markers, ping icons for minimap/objectives.
- Prompt:
`Pixel art UI/VFX sprite sheet, 16x16 and 32x32 elements, objective markers, ping dots, glow accents, compatible with dark sci-fi HUD, transparent background.`

## 3) Export checklist
- PNG only.
- Keep strict `32x32` grid.
- No anti-alias blur outside pixel style.
- Keep color palette coherent between all sheets.
- Test in game with hard refresh (`Ctrl+Shift+R`).
