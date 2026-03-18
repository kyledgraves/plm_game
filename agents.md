# For Autonomous Agents

## Project Context

This is **PLM Factory: The ENOVIA Challenge**, a PLM training game hosted at:
- **GitHub**: https://github.com/kyledgraves/plm_game
- **Local**: http://localhost:5173 (when running `npm run dev`)

## Important Warnings

### DO NOT DELETE FILES FOR COVERAGE

An AutoTest agent previously deleted all React components trying to improve test coverage. This was catastrophic.

**Rule**: Never delete source files to increase coverage. Instead:
- Add new tests for missing functionality
- Write new features that need tests
- Accept that not all code needs 100% coverage

### Test Command

```bash
npm test           # Run unit tests
npm run build      # Build for production
npm run dev        # Start dev server
```

## Codebase Overview

### Core Files (DO NOT DELETE)

- `src/data/missions.ts` - Mission definitions (20 missions)
- `src/data/parts.ts` - Initial parts data (Main Rotor Blade, Rotor Hub, Blade Attachment, etc.)
- `src/store/gameStore.ts` - Zustand state management
- `src/utils/types.ts` - TypeScript interfaces (including StoryProgress with dialogueShownForCurrentMission)
- `src/pages/Act*/*.tsx` - All mission page components
- `src/hooks/useMission.ts` - Mission completion hook with dialogue tracking
- `src/data/story.ts` - Story characters, dialogue, and achievements

### Available Scripts

```bash
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run test             # Run unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:ui      # Playwright UI
```

## Development Guidelines

### Adding a New Mission

1. Add mission definition to `src/data/missions.ts`
2. Create page component in `src/pages/Act{N}/Mission{N}_{N}.tsx`
3. Use `useMission` hook for completion logic:
   ```tsx
   const { setObjectives, handleComplete } = useMission({
     missionId: 'X_Y',
     nextMissionId: 'X_Y+1',
     score: 100
   })
   ```
4. Add route in `src/App.tsx`

### State Management

Use the Zustand store in `src/store/gameStore.ts`:
- Parts: `useGameStore(state => state.parts)`
- Creating parts: `useGameStore(state => state.createPart)`
- Progress: `useGameStore(state => state.completeMission)`

### Testing

- Tests live in `src/**/__tests__/*.test.ts`
- Use `@testing-library/react` for component tests
- Use vitest globals (describe, it, expect)
- Setup in `src/test/setup.ts`

## Common Issues

### LSP Errors
The LSP may show errors for deleted files in `src/components/game/` - these are from deleted components and can be ignored or cleaned up.

### Test Failures
If tests fail:
1. Check `src/test/setup.ts` exists
2. Verify `vitest.config.ts` has `globals: true`
3. Run `npm test` to see actual errors

## Recent Fixes & Best Practices

### Dialogue System
- **Do not** duplicate dialogue setting logic in mission components
- Use `useMission` hook's `dialogue` parameter to set dialogue
- Dialogue tracking is now in the store (`dialogueShownForCurrentMission`) to prevent repetition
- Dialogue box blocks mission content interaction with semi-transparent overlay

### Mission Flow
- Act 1 Missions:
  - 1_1: Create Main Rotor Blade (HT-11000)
  - 1_2: Link specifications to part
  - 1_3: Build BOM using Rotor Hub and Blade Attachment
  - 1_4: Calculate quantity rollup (interactive)
  - 1_5: Create revision and modify assembly specifications

### Component Structure
- **DialogueBox**: Must call all hooks before any conditional returns
- **Mission.tsx**: Wraps all missions with dialogue/achievement components
- **useMission**: Handles dialogue triggering and completion logic

### React Rules
- Never call hooks conditionally or after early returns
- Always use selector functions with Zustand (e.g., `useGameStore(state => state.storyProgress)`)
- Keep hooks at the top level of components

## Contact

For questions about this project, refer to:
- [architecture.md](./architecture.md) - Technical details
- [roadmap.md](./roadmap.md) - Future plans
- [resume.md](./resume.md) - Current status and known issues
