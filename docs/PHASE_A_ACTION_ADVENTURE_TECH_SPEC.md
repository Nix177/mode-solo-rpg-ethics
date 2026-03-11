# Phase A Technical Spec - Action Adventure Foundation

Date: 2026-03-09
Project: mode-solo-rpg-ethics (canvas RPG mode)
Primary file today: game.js

## 1) Goal
Build a real 2D action-adventure RPG core while keeping ethical dilemmas as the story center.

The player must feel:
- exploration and movement mastery
- light combat / traversal tension
- meaningful faction pauses
- final ethical decision (vote + justification) with no moral score

## 2) Hard Design Rules
1. Dilemma-linked sequences are never punitive.
2. Action sequences can fail and retry quickly.
3. Gameplay must not imply a "correct" ethical answer.
4. Every level keeps the same macro loop for readability.

## 3) Macro Loop For All Levels
1. Arrival and context setup
2. Exploration mission (non-fail)
3. Action mission A (fail + retry)
4. Faction pause A (1-2 NPCs)
5. Action mission B (fail + retry, higher intensity)
6. Faction pause B (last NPC + reframing)
7. Vote + justification + neutral synthesis

## 4) Current Code Anchors (for implementation)
- Boot/init: `init()`
- Scene load: `loadLevel(sceneId)`
- Player input: `setupInput()`, `sendPlayerAction()`
- Mission objective HUD: `updateObjectiveInfo()`
- Action modules: `startMiniGame()`, `startStructuredActionMission()`
- World/NPC: `spawnAmbientNPCs()`, `getAdjacentInteractable()`
- UI draw: `draw()`, `drawMinimap()`
- Save/continue: `saveGame()`, `loadSavedGame()`
- Terminal/vote: `openVotingTerminal()`

## 5) Phase A Scope (now)
### In scope
- Remove low-value minigames (math/quiz style) from normal progression.
- Introduce action-adventure mission framework (encounters, traversal, retry).
- Make UI responsive and remove dead screen space.
- Make interactables readable (unique terminal, NPC labels, objective highlights).
- Fix collision readability (only explicit blockers block).
- Restore player-select at new game start.
- Move options/audio/language to Pause Menu (`P`).
- Split tutorial vote behavior vs narrative vote behavior.

### Out of scope (Phase B/C)
- Full content rewrite for all 50 levels.
- Advanced enemy AI trees.
- Full map streaming system.

## 6) State Machine (new canonical flow)
Add `state.sceneFlow`:
- `phase`: `arrival | explore_1 | action_1 | faction_1 | action_2 | faction_2 | vote | complete`
- `activeMissionId`: string|null
- `requiredNpcIds`: string[]
- `talkedNpcIds`: string[]
- `checkpoints`: object
- `actionRetries`: number
- `voteArmed`: boolean
- `awaitingJustification`: boolean

Transition rules:
1. `arrival -> explore_1` after intro close.
2. `explore_1 -> action_1` when exploration objectives are visited.
3. `action_1 -> faction_1` on success.
4. `faction_1 -> action_2` when required NPC subset talked.
5. `action_2 -> faction_2` on success.
6. `faction_2 -> vote` when final NPC talked.
7. `vote -> complete` after valid decision + justification.

## 7) Vote System Specification
### Tutorial level (`level_0`)
- No real dilemma decision required.
- Teach command format only.
- Accept scripted command to open door:
  - `voter`
  - `je justifie ma reponse ici: ...` (tutorial template accepted)

### Narrative levels (`level_1+`)
- Terminal opens vote instructions and context reminder.
- Required:
  1. all required faction NPCs talked
  2. flow phase = `vote`
  3. player types `voter`
  4. player types `je justifie ma reponse ici: ...`
- Then system:
  - infers exit/faction from text
  - stores decision + justification
  - shows neutral synthesis
  - unlocks door

## 8) Responsive UI Spec
### Layout targets
- Canvas fills window minus safe margins.
- Top bar compact, single row, no overlaps.
- Objective panel docked top-right, max width 32vw.
- Chat panel adaptive:
  - desktop: right column
  - small screens: bottom sheet
- Minimap always visible bottom-left.

### Technical rules
- Replace fixed canvas assumptions with resize handler.
- Use CSS clamp for panel sizes.
- Add overlap guards:
  - top HUD does not cover player center region.
  - chat panel collapses automatically during action.

## 9) Pause Menu Spec (`P`)
Pause menu owns:
- Resume
- New game
- Continue
- Language selector
- Audio controls
- Accessibility (text size, contrast)

Top bar must remove direct audio/language clutter after this migration.

## 10) Player Selection Spec
Restore selection on `New Game`:
- `showPlayerSelection()` opens preset picker.
- Save selected preset in save data.
- `Continue` reuses last preset.

## 11) Interaction Readability Spec
### NPC labels
When in interaction range:
- Show floating label above NPC:
  - display name
  - status: `Parler` or `Verrouille`

### Objective highlights
- Untalked required NPCs: subtle ring/halo pulse.
- Active mission terminal: unique color pulse.
- Minimap markers match same semantics.

### Terminal uniqueness
- Dedicated sprite key: `terminal_unique`.
- Never reused by generic props.
- Optional fallback generated sprite still visually unique.

## 12) Collision and Navigation Spec
### Classification
Each map cell/object has one of:
- `walkable_floor`
- `walkable_decor`
- `blocking_obstacle`
- `trigger_only`

### Rules
- Only `blocking_obstacle` blocks movement.
- Decorative assets default to non-blocking unless explicitly flagged.
- Path corridors must keep minimum width >= 3 tiles in main routes.
- No mandatory slalom in core path.

## 13) Larger Level Plan
### New size tiers
- Tier A (current early): 96x72
- Tier B (high complexity): 112x84

### Spatial template
- 1 central hub
- 3 thematic subzones
- 1 climax zone
- 2 shortcut links unlocked by progression

### Performance guardrails
- Entity budget per scene
- Decoration density cap by zone
- Draw culling by camera bounds only

## 14) Mission Framework (replace trivial minigames)
Mission types (action-adventure oriented):
1. Traversal hazard (timed gates, moving blockers)
2. Light combat arena (patterns + dodge + stun)
3. Escort/protect route (short, checkpointed)
4. Route control (open/close paths to stabilize area)

Mission metadata schema:
- `missionId`
- `type`
- `contextTag`
- `failureMode`
- `retryCheckpoint`
- `successEffects`
- `uiBrief`

## 15) Data Schema Additions (`scenario.json`)
Add optional `level_design` per scene:
- `map_size`: `{w,h}`
- `flow_template`: `standard_action_adventure`
- `zones`: array of named zones
- `missions`: mission descriptors
- `faction_pauses`: required NPC groups per pause
- `vote_mode`: `tutorial_scripted` or `narrative_real`

Example:
```json
{
  "level_design": {
    "map_size": {"w": 96, "h": 72},
    "flow_template": "standard_action_adventure",
    "vote_mode": "narrative_real",
    "missions": [
      {"missionId": "l2_flow_a", "type": "traversal_hazard", "contextTag": "gallery_breakdown"},
      {"missionId": "l2_flow_b", "type": "route_control", "contextTag": "atelier_evidence"}
    ]
  }
}
```

## 16) Delivery Plan
### P0 (stability and clarity)
- Fix boot/new game/continue routing.
- Implement responsive canvas and HUD docking.
- Restore player selection.
- Pause menu migration.
- Terminal uniqueness + collision classification.
- NPC range labels + untalked highlights.
- Tutorial vote behavior split from narrative vote behavior.

### P1 (first vertical slice)
- Apply full loop to levels 1, 2, 4.
- Replace low-value minigames with mission framework.
- Add checkpoint/retry UX.

### P2 (scale and consistency)
- Apply same loop template to levels 3-10.
- Increase map sizes and landmark readability.
- Tune pacing and difficulty.

## 17) QA Acceptance Checklist
### Boot and save
- New game starts tutorial flow cleanly.
- Continue resumes exactly from save.
- No accidental jump to wrong level unless continue selected.

### UI/UX
- No big unused black margins on common resolutions.
- No panel overlaps hiding objectives.
- Pause menu contains settings.

### Interactions
- Terminal always identifiable.
- NPC names visible at range.
- Required NPCs highlighted until talked.

### Collisions
- Decorative-only assets are traversable.
- Core routes are broad and readable.
- No forced slalom for mandatory objectives.

### Narrative fairness
- Action failure never auto-selects moral outcome.
- Vote always requires explicit player justification in narrative levels.

## 18) Backlog Memory (from your latest feedback)
Keep and implement next:
- remove trivial math-like minigame progression
- responsive full-window usage
- no wrong level boot confusion
- no fake transparent assets / overlap artifacts
- no hidden terminal among generic props
- objective/NPC highlighting discreet but clear
- pause menu as single options hub
- restore playable character selection
- clear Sarah/NPC accessibility and lock reasons
- tutorial vote command guided, narrative vote analyzed

---
This document is the coding baseline for Phase A implementation.
