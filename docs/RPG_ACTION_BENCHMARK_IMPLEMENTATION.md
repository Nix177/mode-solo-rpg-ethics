# RPG 2D Benchmark -> Action-Adventure Blueprint

Date: 2026-03-09
Scope: mode-solo-rpg-ethics (canvas RPG mode)

## 1) What the most successful 2D RPGs do well
Reference families used for design extraction:
- The Legend of Zelda (2D eras): room-scale puzzle/action loops, readable landmarks, short fail-retry loops.
- Chrono Trigger / classic JRPG pacing: town -> route tension -> boss spike -> narrative pause.
- Undertale: combat as expression (mercy/fight style) and strong encounter identity.
- Stardew / top-down life RPGs: clear goals, low friction traversal, repeatable daily loops.
- Hyper Light Drifter / modern action pixel RPGs: snappy movement, pattern-based combat, exploration rewards.

Core repeatable principles:
1. Clear micro-goal every 20-40 seconds.
2. Distinct spaces with landmarks (player always knows "where to go next").
3. Action challenges that restart fast at checkpoint.
4. Dialogue pauses after action spikes (breathing rhythm).
5. Optional mastery layers, mandatory path remains fair.

## 2) Translation for this ethics RPG
The ethical dilemma remains the story core.
Action-adventure is the body loop:
1. Enter zone + visual tension
2. Exploration objective (cannot fail)
3. Action challenge 1 (can fail/retry)
4. Faction pause (1-2 NPCs)
5. Action challenge 2 (can fail/retry, harder)
6. Final faction pause
7. Vote + textual justification

Fairness rule:
- Action failure never selects moral outcome.
- Moral decision is always explicit via vote + justification.

## 3) Gameplay systems to scale from level 1 to 50
## Exploration system
- Larger maps with 4-5 macro zones.
- Main boulevards always open (no forced slalom).
- Optional side pockets for flavor/lore.

## Action system
- Contextual mission archetypes (not math quizzes):
  - Traversal hazard
  - Light duel/combat pattern
  - Precision route pressure
  - Directional rhythm under stress
- Checkpointed retries.
- 3-second readable brief before action starts.

## Faction interaction system
- Required NPCs highlighted softly until talked.
- Ambient NPCs visually distinct and non-interactive.
- Nameplates near NPCs with state: parler / verrouille / consulte.

## 4) Visual/level readability standards
- One unique terminal asset per scene for action trigger.
- Decorative distribution caps per zone (no clutter pileups).
- Objective markers visible on minimap and in-world.
- Responsive HUD with pause menu as settings hub.

## 5) Difficulty and retention curve
- Level N uses 2 action beats:
  - Beat A: onboarding pattern
  - Beat B: variation + pressure
- Failure budget:
  - 0 punishment for dialogue/exploration
  - quick restart for action with no inventory loss
- Every 3 levels:
  - introduce 1 new mechanic
  - remix previous 2 mechanics

## 6) Production roadmap
Phase A (implemented foundation):
- Start menu new/continue.
- Pause menu with settings migration.
- Character selection restored.
- Larger maps and cleaner routes.
- Distinct NPC readability and minimap markers.
- Remove math/spam minigames from core loop.

Phase B:
- Dedicated mission framework objects in data schema (`level_design.missions`).
- Two action beats per level for levels 1-10.
- Contextual combat/traversal variants by dilemma family.

Phase C:
- Propagated rollout across levels 11-50.
- Additional enemy/obstacle patterns and theme-specific hazards.
