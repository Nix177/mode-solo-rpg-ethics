# Prompts de regeneration - animations directionnelles propres

Objectif: regenerer uniquement les directions qui sont mauvaises a la source. Le moteur lit maintenant des frames individuelles, donc le format le plus fiable est: 1 direction = 1 strip horizontal de 6 frames.

## Chemins de depot recommandes

Deposer les PNG generes ici, en conservant les noms exacts:

- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\player_warrior\walk_up_right.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\player_warrior\walk_down_left.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\player_mage\walk_up_right.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\player_hunter\walk_up_right.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\player_hunter\walk_down_right.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\boss_level_01\walk_up_right.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\enemy_raider\walk_down.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\assets\new assets\regenerated_directions\enemy_drone\walk_down.png`

## Prompt modele - joueur, une direction

Remplacer `[CLASS]`, `[DIRECTION]`, `[WEAPON]`, `[OUTFIT]` et `[FILE_NAME]`.

```text
Create a clean pixel-art RPG walking animation strip for a top-down 2D action RPG.
Character: [CLASS], [OUTFIT], equipped with [WEAPON].
Direction: [DIRECTION] ONLY. The character must face and walk toward [DIRECTION] in every frame. Do not show any other direction.
Format: transparent PNG, true alpha transparency, no checkerboard, no background, no shadow outside the character, no labels, no grid lines.
Canvas: exactly 768 x 128 pixels, arranged as 6 equal frames horizontally, each frame exactly 128 x 128 pixels.
Animation: 6-frame walking cycle, full body visible in every frame, feet and hair never cropped, consistent character scale and position, centered in each frame, 8-pixel transparent padding minimum on all sides.
Style: cohesive high-quality fantasy pixel art, crisp edges, readable silhouette at 48-64 px in game, same art style as a polished 2D action RPG.
Important: do not duplicate identical frames. Each frame must be a slight step progression. Do not create rows. Create only one horizontal strip.
Output filename: [FILE_NAME]
```

## Prompts exacts prioritaires

### Warrior walk up-right

```text
Create a clean pixel-art RPG walking animation strip for a top-down 2D action RPG.
Character: young warrior, blue steel armor, round blue shield on left arm, short sword in right hand, brown hair.
Direction: UP-RIGHT / NORTH-EAST ONLY. The character must face and walk toward the upper-right diagonal in every frame. Do not make him face left, right, down, or straight up.
Format: transparent PNG, true alpha transparency, no checkerboard, no background, no shadow outside the character, no labels, no grid lines.
Canvas: exactly 768 x 128 pixels, arranged as 6 equal frames horizontally, each frame exactly 128 x 128 pixels.
Animation: 6-frame walking cycle, full body visible in every frame, feet and hair never cropped, consistent character scale and position, centered in each frame, 8-pixel transparent padding minimum on all sides.
Style: cohesive high-quality fantasy pixel art, crisp edges, readable silhouette at 48-64 px in game, same art style as a polished 2D action RPG.
Important: do not duplicate identical frames. Each frame must be a slight step progression. Do not create rows. Create only one horizontal strip.
Output filename: walk_up_right.png
```

### Warrior walk down-left

```text
Create a clean pixel-art RPG walking animation strip for a top-down 2D action RPG.
Character: young warrior, blue steel armor, round blue shield on left arm, short sword in right hand, brown hair.
Direction: DOWN-LEFT / SOUTH-WEST ONLY. The character must face and walk toward the lower-left diagonal in every frame. Do not make him face straight left, right, up, or down.
Format: transparent PNG, true alpha transparency, no checkerboard, no background, no shadow outside the character, no labels, no grid lines.
Canvas: exactly 768 x 128 pixels, arranged as 6 equal frames horizontally, each frame exactly 128 x 128 pixels.
Animation: 6-frame walking cycle, full body visible in every frame, feet and hair never cropped, consistent character scale and position, centered in each frame, 8-pixel transparent padding minimum on all sides.
Style: cohesive high-quality fantasy pixel art, crisp edges, readable silhouette at 48-64 px in game, same art style as a polished 2D action RPG.
Important: do not duplicate identical frames. Each frame must be a slight step progression. Do not create rows. Create only one horizontal strip.
Output filename: walk_down_left.png
```

### Mage walk up-right

```text
Create a clean pixel-art RPG walking animation strip for a top-down 2D action RPG.
Character: hooded mage, deep blue robe with gold trim, crystal staff, small glowing blue crystal, readable face under hood.
Direction: UP-RIGHT / NORTH-EAST ONLY. The mage must face and walk toward the upper-right diagonal in every frame. Do not make the mage face left or straight right.
Format: transparent PNG, true alpha transparency, no checkerboard, no background, no shadow outside the character, no labels, no grid lines.
Canvas: exactly 768 x 128 pixels, arranged as 6 equal frames horizontally, each frame exactly 128 x 128 pixels.
Animation: 6-frame walking cycle, full body visible in every frame, robe hem and hood never cropped, consistent character scale and position, centered in each frame, 8-pixel transparent padding minimum on all sides.
Style: cohesive high-quality fantasy pixel art, crisp edges, readable silhouette at 48-64 px in game, same art style as a polished 2D action RPG.
Important: do not duplicate identical frames. Each frame must be a slight step progression. Do not create rows. Create only one horizontal strip.
Output filename: walk_up_right.png
```

### Hunter walk up-right

```text
Create a clean pixel-art RPG walking animation strip for a top-down 2D action RPG.
Character: agile hunter/ranger, green leather armor, brown boots, short cloak, bow on back, dagger at belt, brown hair.
Direction: UP-RIGHT / NORTH-EAST ONLY. The hunter must face and walk toward the upper-right diagonal in every frame. Do not make the hunter face straight right.
Format: transparent PNG, true alpha transparency, no checkerboard, no background, no shadow outside the character, no labels, no grid lines.
Canvas: exactly 768 x 128 pixels, arranged as 6 equal frames horizontally, each frame exactly 128 x 128 pixels.
Animation: 6-frame walking cycle, full body visible in every frame, feet and hair never cropped, consistent character scale and position, centered in each frame, 8-pixel transparent padding minimum on all sides.
Style: cohesive high-quality fantasy pixel art, crisp edges, readable silhouette at 48-64 px in game, same art style as a polished 2D action RPG.
Important: do not duplicate identical frames. Each frame must be a slight step progression. Do not create rows. Create only one horizontal strip.
Output filename: walk_up_right.png
```

### Hunter walk down-right

```text
Create a clean pixel-art RPG walking animation strip for a top-down 2D action RPG.
Character: agile hunter/ranger, green leather armor, brown boots, short cloak, bow on back, dagger at belt, brown hair.
Direction: DOWN-RIGHT / SOUTH-EAST ONLY. The hunter must face and walk toward the lower-right diagonal in every frame. Do not make the hunter face straight right.
Format: transparent PNG, true alpha transparency, no checkerboard, no background, no shadow outside the character, no labels, no grid lines.
Canvas: exactly 768 x 128 pixels, arranged as 6 equal frames horizontally, each frame exactly 128 x 128 pixels.
Animation: 6-frame walking cycle, full body visible in every frame, feet and hair never cropped, consistent character scale and position, centered in each frame, 8-pixel transparent padding minimum on all sides.
Style: cohesive high-quality fantasy pixel art, crisp edges, readable silhouette at 48-64 px in game, same art style as a polished 2D action RPG.
Important: do not duplicate identical frames. Each frame must be a slight step progression. Do not create rows. Create only one horizontal strip.
Output filename: walk_down_right.png
```

## Prompt modele - mob ou boss, une direction

```text
Create a clean pixel-art enemy walking animation strip for a top-down 2D action RPG.
Enemy: [ENEMY_DESCRIPTION].
Direction: [DIRECTION] ONLY. The enemy must face and walk toward [DIRECTION] in every frame.
Format: transparent PNG, true alpha transparency, no checkerboard, no background, no labels, no grid lines.
Canvas: exactly 768 x 128 pixels, arranged as 6 equal frames horizontally, each frame exactly 128 x 128 pixels.
Animation: 6-frame walking cycle, full creature visible in every frame, never cropped, centered in each frame, 8-pixel transparent padding minimum on all sides.
Style: cohesive high-quality fantasy pixel art, crisp edges, readable silhouette at 48-64 px in game.
Important: one horizontal strip only, no rows, no duplicate frames.
```