# Roadmap

## Current Status (v1.0)

The game has a functional core with:
- 20 missions across 4 Acts
- Part creation and management
- Bill of Materials (BOM) building
- Change management workflow
- Configuration management
- Progress tracking and scoring

## Planned Features

### High Priority

1. **Enhanced 3D Visualization**
   - Integrate Three.js for 3D part viewing
   - Assembly visualization
   - Interactive BOM tree display

2. **E2E Tests**
   - Restore Playwright tests
   - Navigation testing
   - Act 4 completion flow

3. **Public Assets**
   - Add helicopter.svg and other graphics
   - Mission completion animations
   - Badge icons

### Medium Priority

4. **Game Modes**
   - Time Attack mode (complete missions fast)
   - Score Attack mode (maximize points)

5. **Save System**
   - Multiple save slots
   - Save/Load game state

6. **Leaderboard**
   - Local high scores
   - Optional online leaderboard

7. **Sound Effects**
   - Mission completion sounds
   - UI feedback sounds

### Lower Priority

8. **Tutorial System**
   - First-time user walkthrough
   - Tooltips for PLM concepts

9. **Advanced PLM Features**
   - Variant configuration matrix
   - Roll-up calculations
   - Workflow automation

10. **Mobile Support**
    - Responsive design improvements
    - Touch-friendly controls

## Mission Expansion

### Act Ideas
- **Act 5**: Advanced PLM (simulation, analysis)
- **Act 6**: PLM Integration (CAD, ERP)
- **Bonus Missions**: Challenge modes, speed runs

## Technical Debt

- Remove unused code in `src/components/game/`
- Clean up LSP errors
- Add public directory with assets

## Contributing

See [agents.md](./agents.md) for guidelines on contributing to this project.
