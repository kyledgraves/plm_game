# PLM Game - Current Status

## Last Updated
March 17, 2026

## What Was Done

### Story System (Implemented)
- Created `src/data/story.ts` with characters, dialogue, and achievements
- Created story components:
  - `src/components/story/DialogueBox.tsx` - Typewriter animation dialogue
  - `src/components/story/CharacterPanel.tsx` - Character display
  - `src/components/story/AchievementToast.tsx` - Achievement popup
- Extended `src/store/gameStore.ts` with story state
- Extended `src/utils/types.ts` with story types
- Updated `src/hooks/useMission.ts` with dialogue/achievement params
- Updated all Act 1 missions with story content

### Route Fix (Implemented)
- Fixed `src/App.tsx` to wrap mission routes with `<Mission />` component
- The Mission component contains DialogueBox and AchievementToast

## Known Issues

### Issue: White Screen / Dialogue Not Showing (FIXED)
- **Symptom**: Yellow debug box briefly appears, then white screen
- **Cause**: 
  1. Duplicate dialogue setting in Mission1_1.tsx causing race condition
  2. React hooks order violation in DialogueBox.tsx (hooks called after conditional returns)
  3. Dialogue restarting after completion due to useMission hook re-triggering
- **Fix**: 
  1. Removed duplicate useEffect in Mission1_1.tsx
  2. Fixed storyProgress selector in useMission.ts
  3. Restructured DialogueBox.tsx to call all hooks before any conditional returns
  4. Added dialogueShown state to prevent dialogue from restarting after completion

### Issue: Act 1 Mission Flow Inconsistencies (FIXED)
- **Symptom**: Mission 1_3 had inappropriate child parts for Main Rotor Blade, Mission 1_4 dialogue didn't match mission content, Mission 1_4 total quantity was already populated, user could proceed without clicking through dialogue, dialogue was repeating, Mission 1_2 dialogue didn't flow properly, Mission 1_5 was not meaningful (only adding description)
- **Cause**: Initial parts data didn't include appropriate child parts for rotor blade, dialogue was mismatched, Mission 1_4 was passive display instead of interactive learning, no overlay blocked interaction during dialogue, local state for tracking dialogue shown was being reset, Mission 1_2 dialogue had logical gaps, Mission 1_5 only allowed adding description without modifying assembly
- **Fix**: 
  1. Added Rotor Hub and Blade Attachment as appropriate child parts for Main Rotor Blade
  2. Updated dialogue for Mission 1_4 to be more appropriate for learning about quantity rollup
  3. Made Mission 1_4 interactive - player must calculate and enter the total quantity rollup
  4. Added semi-transparent overlay to block interaction with mission content while dialogue is active (dialogue remains interactive)
  5. Moved dialogue shown tracking from local state to store to prevent repetition issues
  6. Improved Mission 1_2 dialogue flow to make conversation more natural
  7. Made Mission 1_5 more meaningful - player can now modify assembly specifications (length, material)

### Issue: E2E Tests Not Running
- Playwright has Chromium/X11 issues in this environment
- Tests exist in `tests/e2e/story.spec.ts` but fail to run properly

## What Was Fixed

1. **White Screen Issue**
    - **Duplicate dialogue setting**: Removed duplicate `useEffect` in `src/pages/Act1/Mission1_1.tsx` that was setting dialogue twice
    - **StoryProgress selector**: Fixed `storyProgress` selector in `src/hooks/useMission.ts` to use proper selector function
    - **React hooks order**: Restructured `src/components/story/DialogueBox.tsx` to call all hooks before any conditional returns
    - **Dialogue restart**: Added `dialogueShown` state to prevent dialogue from restarting after completion
    - This ensures dialogue is set correctly without race conditions and follows React's Rules of Hooks

2. **Act 1 Mission Flow Issues**
    - **Inappropriate child parts**: Added Rotor Hub and Blade Attachment as appropriate child parts for Main Rotor Blade in Mission 1_3
    - **Mismatched dialogue**: Updated dialogue for Mission 1_4 (quantity_rollup) to be more appropriate for learning about quantity rollup
    - **Passive display**: Made Mission 1_4 interactive - player must calculate and enter the total quantity rollup instead of just viewing it
    - **No dialogue blocking**: Added semi-transparent overlay to block interaction with mission content while dialogue is active
    - This ensures missions make logical sense in the flow and provide interactive learning

3. **E2E test setup** (Still needs work)
   - Install proper Playwright browsers
   - Fix Chromium/headless issues

## Files Modified Recently
- `src/App.tsx` - Route restructuring
- `src/pages/Mission.tsx` - Added DialogueBox and overlay to block interaction during dialogue
- `src/pages/Act1/Mission1_1.tsx` - Removed duplicate dialogue setting effect
- `src/pages/Act1/Mission1_4.tsx` - Made quantity rollup calculation interactive
- `src/pages/Act1/Mission1_5.tsx` - Made revision creation more meaningful with spec changes
- `src/hooks/useMission.ts` - Fixed storyProgress selector and moved dialogueShown to store
- `src/components/story/DialogueBox.tsx` - Restructured to fix React hooks order issue
- `src/store/gameStore.ts` - Added dialogueShownForCurrentMission flag
- `src/utils/types.ts` - Added dialogueShownForCurrentMission to StoryProgress
- `src/data/parts.ts` - Added Rotor Hub and Blade Attachment parts
- `src/data/story.ts` - Updated Mission 1_2 and 1_4 dialogue

## To Test
```bash
npm run dev
# Then open browser and check console for errors
```

## Commits
- Latest: "Fix white screen issue in dialogue system"
- Previous: "Add E2E test framework and fix story dialogue display"
