# Architecture

## Project Overview

**PLM Factory: The ENOVIA Challenge** is a PLM (Product Lifecycle Management) training game built with React, TypeScript, and Vite. It teaches PLM concepts through 20 missions across 4 Acts, covering part management, BOMs, change management, and configuration.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand with persist middleware
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Testing**: Vitest with React Testing Library
- **3D Graphics**: Three.js (optional, not currently used)

## Directory Structure

```
plm_game/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── error/          # ErrorBoundary
│   │   ├── layout/         # Layout, Header, Sidebar
│   │   ├── story/          # Story components
│   │   │   ├── CharacterPanel.tsx
│   │   │   ├── DialogueBox.tsx
│   │   │   └── AchievementToast.tsx
│   │   └── ui/             # LoadingSpinner, etc.
│   ├── data/               # Static data
│   │   ├── missions.ts     # Mission definitions (20 missions)
│   │   ├── parts.ts        # Initial parts data
│   │   └── story.ts        # Story characters, dialogue, achievements
│   ├── hooks/              # Custom React hooks
│   │   └── useMission.ts   # Mission completion logic
│   ├── pages/              # Page components
│   │   ├── Act1/           # Missions 1_1 - 1_5
│   │   ├── Act2/           # Missions 2_1 - 2_4
│   │   ├── Act3/           # Missions 3_1 - 3_6
│   │   ├── Act4/           # Missions 4_1 - 4_5
│   │   ├── Home.tsx        # Landing page
│   │   ├── Mission.tsx     # Mission wrapper with timer
│   │   ├── MissionSelect.tsx
│   │   └── Results.tsx
│   ├── store/              # State management
│   │   └── gameStore.ts    # Zustand store
│   ├── test/               # Test utilities
│   │   └── setup.ts
│   ├── utils/
│   │   └── types.ts        # TypeScript interfaces
│   ├── App.tsx             # Router configuration
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets (empty currently)
├── index.html
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## State Management

The Zustand store (`src/store/gameStore.ts`) manages:

- **Player Progress**: name, current act/mission, score, completed missions, badges
- **Story Progress**: 
  - `currentDialogue`: key of currently active dialogue
  - `dialogueIndex`: current position in dialogue array
  - `seenDialogues`: array of dialogue keys that have been viewed
  - `currentAchievement`: achievement currently being shown
  - `dialogueShownForCurrentMission`: flag to prevent dialogue repetition
- **Achievements**: unlocked achievements, unlock timestamps
- **Game Settings**: mode (normal/timeAttack/scoreAttack), save slots
- **PLM Data**: parts, product structures, change requests, change orders
- **Configuration**: helicopter configuration options, rules

State is persisted to localStorage.

### Key Store Functions
- `setCurrentDialogue(dialogueKey)`: Sets dialogue to display
- `advanceDialogue()`: Moves to next dialogue entry
- `clearDialogue()`: Clears current dialogue (sets `currentDialogue: null`, `dialogueIndex: 0`)
- `setDialogueShownForCurrentMission(shown)`: Controls dialogue repetition prevention

## Mission Structure

Each mission is a React page component that:
1. Uses `useMission` hook for completion logic
2. Can include character dialogue via the `dialogue` prop
3. Can trigger achievements via the `achievement` prop
4. Implements interactive PLM workflows
5. Updates store state
6. Navigates to next mission on completion

## Story System

The game includes a narrative system called "SkyForge Rising":

### Data Files
- `src/data/story.ts` - Contains:
  - Character definitions (emoji, name, role, color)
  - Dialogue indexed by mission ID
  - Achievement definitions

### Components
- `CharacterPanel.tsx` - Displays current speaking character
- `DialogueBox.tsx` - Shows dialogue with typewriter animation
- `AchievementToast.tsx` - Popup when achievements unlock

### Integration
Story elements are passed through the `useMission` hook:
```typescript
const { handleComplete } = useMission({
  missionId: '1_1',
  nextMissionId: '1_2',
  score: 100,
  dialogue: 'margaret_intro',  // optional dialogue key
  achievement: 'first_part'     // optional achievement key
})
```

### Dialogue Flow & Interaction
- **Blocking**: When dialogue is active, a semi-transparent overlay blocks interaction with mission content
- **Dialogue Box**: Remains interactive and visible above the overlay
- **Repetition Prevention**: `dialogueShownForCurrentMission` flag in store prevents dialogue from restarting
- **Mission Navigation**: Flag is reset when navigating to a new mission

### Important Rules
- **Hooks Order**: All hooks must be called before any conditional returns in `DialogueBox`
- **Selector Pattern**: Use `useGameStore(state => state.storyProgress)` not destructuring
- **Overlay Placement**: Overlay only covers mission content, not the dialogue box itself

## Testing

- Unit tests in `src/**/__tests__/*.test.ts`
- Run with `npm test`
- Run with coverage: `npm run test:coverage`

## Build

- `npm run build` - Production build
- `npm run dev` - Development server
- Output goes to `dist/` directory
