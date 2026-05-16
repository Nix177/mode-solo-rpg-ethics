# Sprite cleanup summary 20260515

Completed phases:
1. Audited player, shaman, main NPC and chief sprites.
2. Generated contact sheets for original and cleaned candidates.
3. Rejected the aggressive global cleaner because it damaged metal weapons.
4. Applied a safer foot-zone cleaner to player walk frames and key NPCs.
5. Applied a white-background connected cleaner to chief idle sheets.
6. Added a ping-pong walk frame sequence in game.js to reduce the 6->1 walk-cycle snap.

Applied replacements:
- 144 player walk frames: warrior, mage, hunter, 8 directions, 6 frames.
- shaman_female_walk.png and shaman_male_walk.png.
- marcus_vane.png, elara.png, prefet_morel.png, maitre_village.png.
- village/mine/forest/port chief idle sheets.

Backups:
- action_rpg_mode/assets/backup_assets/player_walk_detour_before_20260515_144712
- action_rpg_mode/assets/backup_assets/sprite_detour_before_20260515_144642

QA contact sheets:
- contact_sheets/ACTIVE_player_warrior_walk_after_detour.png
- contact_sheets/ACTIVE_player_mage_walk_after_detour.png
- contact_sheets/ACTIVE_player_hunter_walk_after_detour.png

Known remaining issue:
- The actual artistic walk cycle may still be imperfect because the source frames are AI-generated and some poses are too similar. If the in-game movement still limps, regenerate only the directions listed in regeneration_prompts.md.
