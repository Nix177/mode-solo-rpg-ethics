# Regeneration prompts - walk cycles to regenerate only if the in-game test still limps

Use these only for directions that still look wrong after the detour cleanup and ping-pong walk sequence. Keep the existing model as visual reference by uploading the ACTIVE contact sheet and the relevant individual frames.

Output contract for every prompt:
- transparent PNG, no background, no shadow, no contact shadow, no grey/white floor pad;
- 6 separate frames in a single horizontal row;
- same character model, same proportions, same outfit, same weapon/equipment;
- full body and feet visible in every frame, no cropping;
- frame size can be large, but subject must stay centered with consistent foot anchor;
- readable as a 2D top-down action-RPG sprite at 64 px height.

## Warrior - priority: down_right

Prompt:
```text
Using the uploaded warrior reference frames, create a corrected 6-frame walk cycle for the same armored warrior with sword and round shield.
Direction: down-right diagonal, 3/4 top-down RPG view.
The warrior must keep the exact same helmet, blue armor, gold trim, shield, sword, proportions and color palette across all frames.
Make a smooth walk cycle with alternating left foot and right foot, no limp, no repeated static pose, no sudden size change.
Transparent background only. No grey floor pad, no shadow, no contact shadow, no white outline, no checkerboard.
Output as one horizontal strip of exactly 6 frames, equal spacing, full body and feet visible, no cropped sword or shield.
```

Save/slice target:
`action_rpg_mode/assets/sprite_frames/player/warrior/walk/down_right/01.png` to `06.png`

## Warrior - optional if still stiff: right and left

Prompt:
```text
Using the uploaded warrior reference frames, create a corrected 6-frame side walk cycle for the same armored warrior with sword and shield.
Direction: RIGHT side view in top-down RPG style.
Keep the exact same model, armor, shield and sword. Smooth alternating steps, clear foot motion, stable head height, no limp.
Transparent background only, no floor pad, no shadow, no grey pixels around feet.
Output one horizontal strip of exactly 6 frames, consistent scale and anchor, full sword visible.
```

For left, mirror only if it preserves sword/shield logic; otherwise generate true LEFT frames.

## Mage - optional if robe still slides instead of walking

Prompt:
```text
Using the uploaded mage reference frames, create a corrected 6-frame walk cycle for the same blue-robed mage with staff and glowing crystal.
Direction: [DOWN / RIGHT / UP / LEFT / DIAGONAL as needed].
Keep the exact same hood, face, robe, gold trim, staff, glowing blue crystal and proportions.
Make the robe move with visible alternating steps underneath, not sliding. Stable body height, no model changes between frames.
Transparent background only. No grey floor pad, no shadow, no contact shadow, no white outline.
Output one horizontal strip of exactly 6 frames with full body and staff visible.
```

## Hunter - optional if legs still look too similar

Prompt:
```text
Using the uploaded hunter reference frames, create a corrected 6-frame walk cycle for the same green-hooded hunter with bow, quiver and dagger.
Direction: [DOWN / RIGHT / UP / LEFT / DIAGONAL as needed].
Keep the exact same hood, cloak, leather armor, bow, quiver, dagger, colors and proportions.
Make a smooth walk cycle with clear alternating steps and cloak follow-through, no sudden size change, no repeated static pose.
Transparent background only. No grey floor pad, no shadow, no contact shadow, no checkerboard.
Output one horizontal strip of exactly 6 frames, consistent scale and anchor, full body visible.
```

## Shaman/NPC foot cleanup fallback

Prompt:
```text
Using the uploaded shaman NPC spritesheet as reference, recreate the same 2D RPG NPC walk spritesheet with transparent background.
Keep the exact same shaman outfit, hair, colors and proportions.
Remove all grey/white pixels around the feet. No floor pad, no shadow, no checkerboard.
Preserve the same row/column layout and same number of frames as the uploaded sheet.
```
