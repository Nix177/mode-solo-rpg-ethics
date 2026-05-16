# Directional combat v2 audit

- 10 frames per direction instead of 6.
- 8 directions per action.
- Uses source player walk frames to preserve the exact active character model.
- Adds longer anticipation, impact and recovery phases.
- game.js now plays combat actions from action start time rather than global clock.
