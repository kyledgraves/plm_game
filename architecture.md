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
│   │   └── ui/             # LoadingSpinner, etc.
│   ├── data/               # Static data
│   │   ├── missions.ts     # Mission definitions (20 missions)
│   │   └── parts.ts        # Initial parts data
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
- **Game Settings**: mode (normal/timeAttack/scoreAttack), save slots
- **PLM Data**: parts, product structures, change requests, change orders
- **Configuration**: helicopter configuration options, rules

State is persisted to localStorage.

## Mission Structure

Each mission is a React page component that:
1. Uses `useMission` hook for completion logic
2. Implements interactive PLM workflows
3. Updates store state
4. Navigates to next mission on completion

## Testing

- Unit tests in `src/**/__tests__/*.test.ts`
- Run with `npm test`
- Run with coverage: `npm run test:coverage`

## Build

- `npm run build` - Production build
- `npm run dev` - Development server
- Output goes to `dist/` directory
