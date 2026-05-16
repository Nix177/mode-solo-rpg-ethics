# Action RPG - Asset Production Roadmap

Objectif: obtenir un rendu 2D action-RPG coherent, beau et lisible, tout en gardant le dilemme ethique comme coeur narratif. Cette liste sert a generer les assets manquants avec ChatGPT / Nano Banana / autre generateur, puis a les deposer dans des dossiers stables avant integration.

## Regles globales de generation

- Style: 2D fantasy/semi-pixel art premium, top-down 3/4, lisible a petite taille, proche d'un action RPG type Zelda/Secret of Mana/Chrono Trigger modernise.
- Fond: transparent PNG reel. Ne jamais generer de faux damier noir/blanc/gris. Ne pas inclure de fond colore.
- Lumiere: ombrage doux directionnel, contact shadow tres leger sous les pieds seulement si transparent.
- Taille: le personnage doit rester centre et de meme taille dans toutes les frames.
- Direction: 8 directions exactes: down, down_right, right, up_right, up, up_left, left, down_left.
- Animation: 6 frames par direction, boucle propre, anticipation et retour au repos pour attaques.
- Canvas conseille: 192 x 192 px par frame. Spritesheet: 6 colonnes x 8 lignes = 1152 x 1536 px.
- Ordre des lignes: down, down_right, right, up_right, up, up_left, left, down_left.
- Ordre des colonnes: frame 01 a 06 de gauche a droite.
- Original: garder toutes les generations brutes dans `D:/mode solo rpg/mode-solo-rpg-ethics/assets/new assets/to_process/`.
- Final integre: apres detourage/controle, copier dans `D:/mode solo rpg/mode-solo-rpg-ethics/action_rpg_mode/assets/...`.

## Priorite A - Animations joueur indispensables

Le moteur utilise deja ces chemins finaux:

- `action_rpg_mode/assets/spritesheets/player/warrior/attack_basic.png`
- `action_rpg_mode/assets/spritesheets/player/warrior/skill_1.png`
- `action_rpg_mode/assets/spritesheets/player/warrior/skill_2.png`
- `action_rpg_mode/assets/spritesheets/player/mage/attack_basic.png`
- `action_rpg_mode/assets/spritesheets/player/mage/skill_1.png`
- `action_rpg_mode/assets/spritesheets/player/mage/skill_2.png`
- `action_rpg_mode/assets/spritesheets/player/hunter/attack_basic.png`
- `action_rpg_mode/assets/spritesheets/player/hunter/skill_1.png`
- `action_rpg_mode/assets/spritesheets/player/hunter/skill_2.png`

### Prompt commun pour une spritesheet d'action joueur

Generate one transparent PNG spritesheet for a premium 2D top-down action RPG character animation. Orthographic top-down 3/4 view, readable at small game scale, consistent character size in every frame, no background, no checkerboard, transparent alpha. Canvas exactly 1152 x 1536 px, grid exactly 6 columns x 8 rows, each frame exactly 192 x 192 px. Row order: down, down_right, right, up_right, up, up_left, left, down_left. Six frames per row, smooth animation from anticipation to action to recovery. Keep feet aligned near the same baseline in each frame. Do not crop head, weapon, feet, cape, or effects. Do not add text labels.

### Guerrier

Fichier source a deposer:
`assets/new assets/to_process/player/warrior_attack_basic.png`

Prompt specifique:
Warrior class, blue steel armor, sword and shield, same model as the neutral warrior, basic sword slash animation. Each row shows the warrior slashing in the row direction with a clear sword arc, shield held defensively, powerful but readable motion, no gore, heroic fantasy. Keep the body size identical across all frames and directions.

Fichier source:
`assets/new assets/to_process/player/warrior_skill_1.png`

Prompt specifique:
Warrior class, blue steel armor, sword and shield, lunging thrust special attack. The warrior steps forward one short distance and performs a glowing sword thrust in the facing direction. Add a small blue-white motion streak on the sword only, no large background effects. Six frames: charge, step, thrust, impact, recovery, idle return.

Fichier source:
`assets/new assets/to_process/player/warrior_skill_2.png`

Prompt specifique:
Warrior class, blue steel armor, shield wave special. The warrior plants the shield and releases a short crescent shockwave from the shield in the facing direction. Blue-gold energy, defensive feeling, readable silhouette. Six frames: brace, shield raise, wave release, wave peak, recoil, return.

### Mage

Fichier source:
`assets/new assets/to_process/player/mage_attack_basic.png`

Prompt specifique:
Mage class, dark blue robe with gold trim, staff, same neutral mage model, basic magic bolt casting animation. The mage points the staff in the facing direction and releases a small violet-blue orb. Keep the orb close to the staff so the projectile can be drawn separately in game. Six frames: wind-up, staff raise, cast, glow, recoil, return.

Fichier source:
`assets/new assets/to_process/player/mage_skill_1.png`

Prompt specifique:
Mage class, dark blue robe with gold trim, staff, unstable arcane orb special. The mage channels a brighter purple orb with spiral particles around the hands and staff, then launches it forward. Strong magical pose, no oversized effects covering the body. Six frames, consistent body scale.

Fichier source:
`assets/new assets/to_process/player/mage_skill_2.png`

Prompt specifique:
Mage class, dark blue robe with gold trim, staff, radial nova cast. The mage raises the staff and releases a circular blue-violet pulse around them. Keep the effect inside the 192 px frame but not cropped. Six frames: gather, rise, flash, pulse, fade, return.

### Chasseur

Fichier source:
`assets/new assets/to_process/player/hunter_attack_basic.png`

Prompt specifique:
Hunter class, leather ranger outfit, hood or short cloak, bow and dagger, same neutral hunter model, basic bow shot. The hunter draws the bow and releases an arrow in the facing direction. Clear bow posture for all eight directions, no swapped left/right. Six frames: ready, draw, aim, release, recoil, return.

Fichier source:
`assets/new assets/to_process/player/hunter_skill_1.png`

Prompt specifique:
Hunter class, leather ranger outfit, bow, triple arrow special. The hunter draws and releases three glowing arrows in a narrow spread in the facing direction. Keep the body stable and readable, arrow trails visible but not huge. Six frames, consistent scale.

Fichier source:
`assets/new assets/to_process/player/hunter_skill_2.png`

Prompt specifique:
Hunter class, leather ranger outfit, dagger and bow on back, evasive dagger roll special. The hunter rolls diagonally/sideways while slashing with a dagger, still facing the row direction. Motion blur subtle, no crop, same character scale. Six frames: crouch, roll start, roll, slash, land, return.

## Priorite B - Projectiles et impacts

Dossier final conseille:
`action_rpg_mode/assets/fx/`

A generer en PNG transparents individuels ou petites spritesheets 6 frames horizontales.

- `projectile_arrow.png`: arrow side view, rotatable by code, 128 x 32 px, transparent.
- `projectile_magic_bolt.png`: blue-violet orb projectile, 96 x 96 px, transparent.
- `projectile_triple_arrow.png`: three arrow cluster, 160 x 80 px, transparent.
- `fx_sword_slash.png`: crescent sword slash, 6 frames horizontal, 768 x 128 px.
- `fx_shield_wave.png`: blue-gold short shockwave, 6 frames horizontal, 768 x 128 px.
- `fx_magic_impact.png`: violet-blue impact burst, 6 frames horizontal, 768 x 128 px.
- `fx_enemy_hit.png`: small yellow-white hit spark, 6 frames horizontal, 384 x 64 px.
- `fx_level_up.png`: golden vertical sparkle burst, 6 frames horizontal, 768 x 128 px.
- `fx_rare_drop.png`: small rarity sparkle aura, 6 frames horizontal, 768 x 128 px.

Prompt commun FX:
Generate transparent PNG VFX sprites for a premium 2D top-down fantasy action RPG. No background, no checkerboard, clean alpha, readable at small size, high contrast center, soft glow, no text. Horizontal spritesheet, 6 frames left to right, equal frame size, animation must start small, peak bright, fade cleanly.

## Priorite C - Ennemis regionaux complets

Le moteur peut utiliser des spritesheets enemies via:
`action_rpg_mode/assets/spritesheets/enemies/{enemy_id}/{action}.png`

Actions attendues:
- `idle.png`
- `walk.png`
- `attack.png`
- `hurt.png`
- `death.png`

Format: 1152 x 1536 px, 6 colonnes x 8 lignes, 192 x 192 px par frame, meme ordre des directions.

Enemy IDs recommandes pour niveau 1:
- `village_bandit`
- `mine_goblin`
- `forest_goblin`
- `port_pirate`

Prompts courts:

Village bandit:
Small rogue bandit enemy for a top-down fantasy RPG, patched leather clothes, small dagger, mischievous but not scary, readable silhouette, no gore.

Mine goblin:
Cave goblin miner enemy, small hunched creature, mining helmet or lantern, pickaxe, dusty rocky colors, readable silhouette, not too dark.

Forest goblin:
Woodland goblin enemy, mossy green-brown skin, leaves, small wooden spear, magical forest vibe, readable silhouette.

Port pirate:
Harbor pirate enemy, striped shirt, red scarf, small cutlass, nautical colors, lively but child-friendly.

Boss niveau 1:
`action_rpg_mode/assets/spritesheets/bosses/level_01/{action}.png`

Prompt boss:
Large enchanted construction golem boss for a wind-energy sacred forest dilemma level. Mix of mine machinery, wooden beams, glowing forest roots, blue energy core. Child-friendly, imposing but not horror. Top-down 3/4 action RPG boss, 8 directions, 6 frames each, transparent PNG, 1152 x 1536 px.

## Priorite D - Portraits et UI narrative

Portraits coherents, car le dialogue philosophique doit paraitre vivant.

Dossier final:
`action_rpg_mode/assets/profiles/`

A generer:
- `portrait_warrior_class.png`
- `portrait_mage_class.png`
- `portrait_hunter_class.png`
- `portrait_marcus_vane.png`
- `portrait_elara.png`
- `portrait_prefet_morel.png`
- `portrait_maitre_village.png`

Format: PNG transparent ou fond peint discret, 512 x 512 px, meme style, buste 3/4, fantasy painterly clean.

Prompt commun portrait:
Create a coherent illustrated portrait for a fantasy 2D RPG dialogue UI, semi-painterly, clean readable face, soft rim light, parchment-compatible colors, 512 x 512 px, no text, no watermark, same art direction as a polished educational RPG.

## Priorite E - Maps niveau 1 plus belles

Assets supplementaires utiles:

Village:
- variantes de toits, panneaux, routes pavees, petits jardins, fleurs, clotures propres.
- props interactifs: tableau de quetes, forge, fontaine, marche.

Mine:
- rails courbes coherents, wagonnets, murs de grotte hauts, lanternes, minerais bleus/dorés, poutres.

Foret:
- 6 arbres differents: petit, moyen, grand, twisted, glowing, sacred ancient.
- racines, rochers moussus, fleurs lumineuses, pierres runiques.

Port:
- quais directionnels, eau profonde/non traversable, bateaux, filets, caisses, phare, grue.

Best practice placement:
- Les batiments et gros props bloquent le joueur.
- Les sols, chemins, fleurs basses ne bloquent pas.
- Les regions de dialogue restent safe et propres.
- Les ennemis restent en peripherie ou dans zones dangereuses.
- Les chemins doivent guider l'oeil vers le NPC de faction et le portail suivant.

## Priorite F - Audio court et propre

Dossier final:
`action_rpg_mode/assets/audio/sfx/`

A generer ou trouver:
- `hit_enemy_01.ogg`
- `hit_player_01.ogg`
- `item_use_01.ogg`
- `level_up_01.ogg`
- `rare_drop_01.ogg`
- `quest_accept_01.ogg`
- `quest_complete_01.ogg`
- `dialogue_open_01.ogg`

Regles:
- 0.1 a 1.2 seconde maximum.
- Pas de boucle sauf musique.
- Pas de frequences agressives, volume normalise.
- Style fantasy doux, lisible, enfant-friendly.

## Checklist avant integration

- Le PNG a une vraie transparence alpha.
- Pas de faux damier visible.
- Le personnage ne change pas de taille entre directions.
- Les pieds restent sur la meme ligne dans les frames.
- La direction gauche/droite n'est pas inversee.
- Aucun element important n'est coupe.
- Le nom du fichier correspond exactement au chemin attendu.
- Les originaux restent dans `assets/new assets/to_process/`.
- Les fichiers finaux vont dans `action_rpg_mode/assets/...`.


## Priorite G - Interieurs RPG et boutique vendeur

Le jeu a besoin de pauses safe qui ressemblent a de vrais lieux RPG. Le premier interieur prioritaire est la boutique du village, car elle supporte la boucle: combat -> loot -> vendre -> acheter -> repartir.

### Boutique du vendeur - assets a generer

Dossier source conseille:
`assets/new assets/to_process/interiors/shop/`

Dossier final conseille:
`action_rpg_mode/assets/region_assets/interiors/shop/`

Format recommande:
- Tileset interieur: PNG 512 x 512 px, grille 8 x 8, tiles 64 x 64 px.
- Props isoles: PNG transparents, 256 x 256 ou 512 x 512 selon taille.
- Aucun faux damier, vraie transparence.

Prompt tileset boutique:
Generate a premium 2D top-down fantasy RPG shop interior tileset. Canvas exactly 512 x 512 px, grid 8 columns x 8 rows, each tile exactly 64 x 64 px. Cozy village general store / blacksmith shop. Include wooden floor variations, stone floor variations, wall top tiles, wall side tiles, wall corners, counter tiles, rug tiles, shelf floor tiles, door threshold, window light tile, warm shadow tiles, small decorative floor overlays. No text, no characters, no background outside tiles, clean pixel/semi-pixel RPG style.

Prompt props boutique:
Generate isolated transparent PNG props for a premium 2D top-down fantasy RPG shop interior, no background, no checkerboard, consistent scale, warm cozy lighting. Include each prop clearly separated and easy to crop: merchant counter, potion shelf, weapon rack with sword bow staff, armor stand, crate stack, barrel stack, coin chest, open book ledger, wall lantern, small rug, display table with rare necklace, hanging sign, forge corner, anvil, supply sacks, empty item pedestal.

Noms finaux recommandes:
- `shop_floor_wood_tileset.png`
- `shop_wall_counter_tileset.png`
- `shop_counter.png`
- `shop_potion_shelf.png`
- `shop_weapon_rack.png`
- `shop_armor_stand.png`
- `shop_coin_chest.png`
- `shop_ledger_book.png`
- `shop_display_table.png`
- `shop_lantern.png`
- `shop_rug.png`
- `shop_anvil_forge_corner.png`

### Autres interieurs utiles plus tard

- Auberge: sauvegarde/repos, dialogues calmes, rumeurs.
- Forge: amelioration d'equipement, comparaison de stats.
- Maison du maitre du village: vote final, conseil, synthese ethique.
- Bureau de faction: dialogue plus profond avec un NPC principal.
- Entrepot du port: quete de cargaison, pirates, coffre rare.
- Cabane forestiere: lore de la foret, herbes, sanctuaire.
- Poste de mine: contrats, rails, plan du chantier.

Best practice boutique:
- Le marchand doit etre dans une zone safe sans ennemis.
- Le stock doit etre visuellement visible dans l'interieur: potions sur etagere, armes sur rack, armure exposee.
- Les loots vendables doivent garder la meme icone au sol, dans l'inventaire et dans la liste de vente.
- Les prix doivent encourager a vendre les doublons, mais pas rendre l'achat obligatoire.
- La boutique est une pause de rythme, pas une punition economique.
