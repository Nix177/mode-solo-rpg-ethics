# Prompts spritesheets ChatGPT / Nano Banana

Garde les originaux dans `action_rpg_mode/assets/originals/` puis dépose les PNG propres dans les chemins indiqués. Format recommandé: fond transparent, pixel art 2D top-down, pas d'ombre portée opaque, marges constantes, grille visible uniquement si elle reste hors sprite final.

## Joueurs 8 directions, 3 classes
Chemin: `assets/spritesheets/player/<classe>/<action>.png`
Actions: `idle.png`, `walk.png`, `run.png`, `attack_basic.png`, `skill_1.png`, `skill_2.png`, `hurt.png`, `death.png`.
Prompt: "Create a clean transparent PNG sprite sheet for a top-down 2D action RPG player character, class [warrior/mage/hunter], 8 directions: down, down-right, right, up-right, up, up-left, left, down-left. 6 frames per direction, evenly spaced grid, no background, no checkerboard, same character proportions in every frame. Style: polished colorful fantasy pixel art, readable at 48-96 px, child-friendly. Include class equipment visibly: warrior sword and shield, mage staff and robe with spell glow, hunter bow plus dagger. The sprite must face the exact movement direction and stay stable during idle."

## Boss par niveau
Chemin: `assets/spritesheets/enemies/boss_level_<nn>.png`
Prompt: "Create a transparent PNG sprite sheet for a unique top-down 2D action RPG boss for level [theme]. 8 directions, idle/walk/attack/hurt/death rows, 6 frames each, no background, no checkerboard. The boss must match the biome: forest wind construction guardian / art AI gallery security construct / genetic clinic bio guardian / predictive justice surveillance unit / hospital logistics crisis machine. Child-friendly, dramatic silhouette, readable at 96-144 px."

## Décors zone mine / forêt / village / port
Chemin: `assets/tilesets/generated/level_<nn>_<zone>.png`
Prompt: "Create a transparent PNG tileset and prop sheet for a professional top-down 2D RPG map zone: [mine/forest/village/port/lab]. Include floor tiles, wall tiles, corners, cliffs or building edges, ore rocks, crates, lamps, trees, signs, fences, paths. 32x32 or 48x48 grid, clearly separated tiles, no background, no checkerboard, consistent lighting, readable pixel art."

## Icônes compétences et drops
Chemin: `assets/generated/icons/<name>.png`
Prompt: "Create a set of transparent square 128x128 RPG icons in one coherent painterly pixel-art style: health potion, mana potion, XP orb, rare sword, rare bow, rare staff, shield bash, arcane orb, triple arrow, defensive cape, amulet, gloves, boots, chest armor. No text, no background, no checkerboard, high contrast, game inventory ready."
