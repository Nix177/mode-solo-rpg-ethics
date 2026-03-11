# Nano Banana - Spritesheets Animés (4 directions) pour Action RPG

Ce document te donne un pipeline prêt à générer des spritesheets animés faciles à découper.

## 0) Convention unique (important)
Utilise exactement cette convention pour TOUS les personnages/ennemis:

- format: PNG transparent
- pixel art top-down 2D
- grille fixe: **4 lignes x 6 colonnes**
- taille cellule: **96x96 px**
- taille sheet finale: **576x384 px**
- ordre des lignes (haut -> bas):
  1. DOWN
  2. LEFT
  3. RIGHT
  4. UP
- ordre des colonnes (gauche -> droite): frame1, frame2, frame3, frame4, frame5, frame6
- contrainte: un sprite centré dans chaque cellule, ne dépasse jamais les limites de sa cellule
- fond: transparent total, aucun décor, aucun texte, aucun watermark

Si Nano Banana propose un "seed" ou "reference image", garde-le identique par personnage pour assurer la cohérence.

## 1) Arborescence cible

Créer ces dossiers:

- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets\player\warrior\`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets\player\mage\`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets\player\hunter\`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets\enemies\raider\`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets\enemies\drone\`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets\enemies\juggernaut\`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\spritesheets\enemies\stalker\`

## 2) Liste des sheets à générer

### Joueur (3 classes)
Pour chaque classe (`warrior`, `mage`, `hunter`), générer:

- `idle.png`
- `walk.png`
- `run.png`
- `attack_basic.png`
- `skill_1.png`
- `skill_2.png`
- `hurt.png`
- `death.png`

### Ennemis (4 types)
Pour chaque ennemi (`raider`, `drone`, `juggernaut`, `stalker`), générer:

- `idle.png`
- `walk.png`
- `attack.png`
- `hurt.png`
- `death.png`

## 3) Prompt de base (copier au début de chaque prompt)

```
Pixel art top-down action RPG sprite sheet, transparent background, strict 4x6 grid,
cell size 96x96 pixels, total size 576x384 pixels, no frame overflow, no text, no watermark,
row order exactly: DOWN, LEFT, RIGHT, UP, 6 frames per row.
Keep silhouette readable at small size and consistent proportions across all frames.
```

## 4) Prompts précis - Joueur

## 4.1 Guerrier

### A) idle.png
Chemin: `...\player\warrior\idle.png`
Prompt:
```
[BASE PROMPT]
Character: human warrior, steel-blue armor, short sword in right hand, round shield on left arm,
confident neutral stance, subtle breathing motion across frames.
Animation: idle loop (6 frames), small body sway and shield movement only.
```

### B) walk.png
Chemin: `...\player\warrior\walk.png`
Prompt:
```
[BASE PROMPT]
Character: same warrior design as idle.
Animation: walk cycle (6 frames), clear step timing, sword and shield bounce naturally.
No motion blur, clean pixel edges.
```

### C) run.png
Chemin: `...\player\warrior\run.png`
Prompt:
```
[BASE PROMPT]
Character: same warrior design.
Animation: run cycle (6 frames), longer stride, stronger torso lean, shield pulled tighter,
more dynamic than walk while preserving readability.
```

### D) attack_basic.png
Chemin: `...\player\warrior\attack_basic.png`
Prompt:
```
[BASE PROMPT]
Character: same warrior design.
Animation: 1-handed sword slash combo (6 frames): wind-up, slash impact, follow-through, recover.
Use bright steel slash accent, keep weapon arc readable.
```

### E) skill_1.png
Chemin: `...\player\warrior\skill_1.png`
Prompt:
```
[BASE PROMPT]
Character: same warrior design.
Animation: shield bash / dash strike (6 frames), forward burst then impact recoil.
Include subtle cyan impact spark near shield on hit frame.
```

### F) skill_2.png
Chemin: `...\player\warrior\skill_2.png`
Prompt:
```
[BASE PROMPT]
Character: same warrior design.
Animation: spinning slash (6 frames), circular sword motion around body,
strong radial attack pose without leaving cell boundaries.
```

### G) hurt.png
Chemin: `...\player\warrior\hurt.png`
Prompt:
```
[BASE PROMPT]
Character: same warrior design.
Animation: hurt reaction (6 frames), brief hit-stagger and recovery.
```

### H) death.png
Chemin: `...\player\warrior\death.png`
Prompt:
```
[BASE PROMPT]
Character: same warrior design.
Animation: defeat/fall sequence (6 frames), clean readable top-down collapse.
```

## 4.2 Mage

### A) idle.png
Chemin: `...\player\mage\idle.png`
Prompt:
```
[BASE PROMPT]
Character: human mage, dark robe with cyan-violet accents, arcane staff with glowing crystal.
Animation: idle loop (6 frames), cloak flutter + gentle crystal pulse.
```

### B) walk.png
Chemin: `...\player\mage\walk.png`
Prompt:
```
[BASE PROMPT]
Character: same mage design.
Animation: walk cycle (6 frames), robe swing and staff-hand timing.
```

### C) run.png
Chemin: `...\player\mage\run.png`
Prompt:
```
[BASE PROMPT]
Character: same mage design.
Animation: run cycle (6 frames), faster robe flow, stronger lean, staff carried diagonally.
```

### D) attack_basic.png
Chemin: `...\player\mage\attack_basic.png`
Prompt:
```
[BASE PROMPT]
Character: same mage design.
Animation: basic staff cast (6 frames), short projectile release pose,
small arcane flash at staff tip.
```

### E) skill_1.png
Chemin: `...\player\mage\skill_1.png`
Prompt:
```
[BASE PROMPT]
Character: same mage design.
Animation: arcane bolt burst (6 frames), stronger hand/staff cast pose,
violet energy flare on impact frame.
```

### F) skill_2.png
Chemin: `...\player\mage\skill_2.png`
Prompt:
```
[BASE PROMPT]
Character: same mage design.
Animation: radial nova cast (6 frames), charge-up then circular magic pulse release.
```

### G) hurt.png
Chemin: `...\player\mage\hurt.png`
Prompt:
```
[BASE PROMPT]
Character: same mage design.
Animation: hurt reaction (6 frames), stagger + quick recovery.
```

### H) death.png
Chemin: `...\player\mage\death.png`
Prompt:
```
[BASE PROMPT]
Character: same mage design.
Animation: defeat/fall sequence (6 frames).
```

## 4.3 Chasseur

### A) idle.png
Chemin: `...\player\hunter\idle.png`
Prompt:
```
[BASE PROMPT]
Character: human hunter, leather armor, short bow, back quiver, belt dagger.
Animation: idle loop (6 frames), slight breathing and bow-hand adjustment.
```

### B) walk.png
Chemin: `...\player\hunter\walk.png`
Prompt:
```
[BASE PROMPT]
Character: same hunter design.
Animation: walk cycle (6 frames), agile footwork and quiver sway.
```

### C) run.png
Chemin: `...\player\hunter\run.png`
Prompt:
```
[BASE PROMPT]
Character: same hunter design.
Animation: run cycle (6 frames), fast nimble movement, pronounced forward lean.
```

### D) attack_basic.png
Chemin: `...\player\hunter\attack_basic.png`
Prompt:
```
[BASE PROMPT]
Character: same hunter design.
Animation: quick bow shot (6 frames): nock, draw, release, recover.
Readable bowstring and arrow gesture.
```

### E) skill_1.png
Chemin: `...\player\hunter\skill_1.png`
Prompt:
```
[BASE PROMPT]
Character: same hunter design.
Animation: multishot (6 frames), rapid triple-arrow release pose.
```

### F) skill_2.png
Chemin: `...\player\hunter\skill_2.png`
Prompt:
```
[BASE PROMPT]
Character: same hunter design.
Animation: dash slash with dagger (6 frames), fast forward cut then recover.
```

### G) hurt.png
Chemin: `...\player\hunter\hurt.png`
Prompt:
```
[BASE PROMPT]
Character: same hunter design.
Animation: hurt reaction (6 frames).
```

### H) death.png
Chemin: `...\player\hunter\death.png`
Prompt:
```
[BASE PROMPT]
Character: same hunter design.
Animation: defeat/fall sequence (6 frames).
```

## 5) Prompts précis - Ennemis

## 5.1 Raider

- Chemin dossier: `...\enemies\raider\`
- Look: humanoid bandit, red accent, melee threat

Prompts:
- `idle.png`: same base prompt + "idle loop, aggressive breathing"
- `walk.png`: "walk cycle, heavy steps"
- `attack.png`: "melee strike combo, 6-frame attack"
- `hurt.png`: "hit-stagger recovery"
- `death.png`: "collapse/defeat"

## 5.2 Drone

- Chemin dossier: `...\enemies\drone\`
- Look: floating combat drone, orange warning lights

Prompts:
- `idle.png`: "hover idle with slight bob"
- `walk.png` (mouvement): "hover travel cycle"
- `attack.png`: "energy shot burst"
- `hurt.png`: "spark hit reaction"
- `death.png`: "shutdown / fall apart"

## 5.3 Juggernaut

- Chemin dossier: `...\enemies\juggernaut\`
- Look: very heavy armored brute, yellow industrial accents

Prompts:
- `idle.png`: "heavy breathing idle"
- `walk.png`: "slow powerful stomp cycle"
- `attack.png`: "heavy slam attack"
- `hurt.png`: "short recoil"
- `death.png`: "heavy collapse"

## 5.4 Stalker

- Chemin dossier: `...\enemies\stalker\`
- Look: slim fast assassin, purple dark palette

Prompts:
- `idle.png`: "predator idle, low stance"
- `walk.png`: "quick prowling cycle"
- `attack.png`: "fast dual slash attack"
- `hurt.png`: "brief recoil"
- `death.png`: "fall/disappear style"

## 6) Découpe facile (Aseprite ou script)

Comme toutes les sheets sont en 576x384 et cell 96x96:
- colonnes: 6
- lignes: 4
- row order: DOWN, LEFT, RIGHT, UP

Avec Aseprite:
- `File > Import Sprite Sheet`
- Type: Grid
- Width: 96
- Height: 96

## 7) Compatibilité immédiate avec le build actuel

Le build actuel utilise déjà ces PNG statiques:
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\player\player_warrior.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\player\player_mage.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\player\player_hunter.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\enemies\enemy_raider.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\enemies\enemy_drone.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\enemies\enemy_juggernaut.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\enemies\enemy_stalker.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\items\item_potion.png`
- `D:\mode solo rpg\mode-solo-rpg-ethics\action_rpg_mode\assets\sprites\items\item_gold.png`

Donc en attendant l'intégration complète des animations, exporte juste une frame propre (ex: DOWN frame1) vers ces chemins statiques.

Puis on branchera l'animation dans le moteur avec ces sheets.
