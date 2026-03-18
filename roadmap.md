# Roadmap

## Current Status (v1.1 - Story Integration)

The game has:
- 20 missions across 4 Acts (expanding to 7)
- Story mode: "SkyForge Rising" with characters and narrative
- Part creation and management
- Bill of Materials (BOM) building
- Change management workflow
- Configuration management
- Progress tracking and scoring
- **Dialogue system with blocking overlay**
- **Interactive missions (1_4 quantity rollup, 1_5 revision with spec changes)**

### Act 1 Mission Details
- **1_1**: Create Main Rotor Blade (HT-11000) - with Margaret's introduction dialogue
- **1_2**: Link specifications to part - with Devon's resistance to computer system
- **1_3**: Build BOM using Rotor Hub and Blade Attachment
- **1_4**: Calculate quantity rollup (interactive - player must enter correct total)
- **1_5**: Create revision and modify assembly specifications (length, material)

### Recent Fixes
- Fixed white screen issue by removing duplicate dialogue setting and fixing hooks order
- Fixed dialogue repetition by tracking shown state in store
- Fixed overlay to only block mission content, not dialogue box
- Improved Act 1 mission flow and dialogue

---

# Story System: SkyForge Rising

## Premise

**SkyForge Aerospace** - A mid-size aerospace company fighting for a $500M helicopter contract against rival **Vance Aerospace**. The player is a newly promoted **PLM Coordinator** trying to prove themselves.

## Characters

| Character | Emoji | Role | Color |
|-----------|-------|------|-------|
| You | 🙂 | PLM Coordinator | indigo |
| Margaret Chen | 👩‍💼 | PLM Manager | blue |
| Devon Williams | 👨‍🔧 | Senior Design Engineer | orange |
| Rosa Martinez | 🏭 | Production Manager | red |
| Tom Bradley | 📊 | ERP Lead | purple |
| Alex Kim | 🔍 | Quality Engineer | green |
| Jordan Reeves | 🤝 | HeliCare Rep | teal |

## Story Acts

### Act 1: Foundation (5 missions)
- Learn the basics, prove yourself
- Margaret mentors, Devon resists, Alex observes

### Act 2: Collaboration (4 missions)
- Get the team working together
- Jordan (customer) visits

### Act 3: Crisis (6 missions)
- Competitor threat emerges
- Fix a critical failure through change management

### Act 4: Configuration (5 missions)
- Win the contract with helicopter configuration

### Act 5-7: MES/ERP/Digital Thread (future)
- Manufacturing operations, business integration, digital thread

---

# PLM-MES-ERP Integration (New)

## Background: The Manufacturing Ecosystem

Real-world manufacturing uses three interconnected systems:

| System | Scope | Key Data |
|--------|-------|----------|
| **PLM** (Product Lifecycle Management) | Design & Engineering | eBOM, specifications, CAD, revisions |
| **MES** (Manufacturing Execution System) | Shop Floor | Work orders, mBOM, quality, tracking |
| **ERP** (Enterprise Resource Planning) | Business Planning | pBOM, inventory, procurement, finance |

The "Digital Thread" connects these systems, enabling data to flow from design through manufacturing to business planning.

## Data Flow

```
PLM (Design) 
    → eBOM, specifications → ERP (Planning)
                                    → pBOM, material requirements → MES (Production)
                                                                      → Quality, actuals → PLM/ERP
```

---

## Proposed New Acts

### Act 5: Manufacturing Operations (MES Focus)

**Theme**: Bridge from engineering to production floor

**Missions**:
1. **Work Order Creation** - Convert approved BOMs into work orders
2. **Shop Floor Routing** - Define manufacturing steps and sequences
3. **Material Allocation** - Reserve inventory for production
4. **Production Tracking** - Track progress through work centers
5. **Quality Control** - Record inspections and defect tracking
6. **Production Completion** - Close work orders, update inventory

**Key Concepts**:
- Work order states (Released, In Progress, Completed)
- Routing/工艺路线 (step-by-step manufacturing instructions)
- Material staging and kitting
- Scrap and yield tracking
- Labor time recording

### Act 6: Business Integration (ERP Focus)

**Theme**: Connect manufacturing to business systems

**Missions**:
1. **Material Requirements Planning** - Calculate raw material needs
2. **Purchase Requisitions** - Request materials from suppliers
3. **Inventory Management** - Track stock levels and locations
4. **Cost Rollup** - Calculate product costs from BOM
5. **Capacity Planning** - Balance production capacity
6. **Order Fulfillment** - Ship to customers

**Key Concepts**:
- pBOM (production BOM) vs eBOM (engineering BOM)
- Material requirements calculation
- Inventory allocation and ATP (Available to Promise)
- Cost rollup from raw materials → components → assembly
- Lead time and scheduling

### Act 7: The Digital Thread (Integration)

**Theme**: Close the loop between all systems

**Missions**:
1. **Change Propagation** - Push PLM changes to MES/ERP
2. **Manufacturing Feedback** - Report production issues back to design
3. **Revision Synchronization** - Ensure all systems have latest version
4. **Traceability** - Track each product's history
5. **Analytics Dashboard** - View integrated metrics
6. **Close the Loop** - Complete the digital thread

**Key Concepts**:
- Bi-directional data flow
- Engineering change impact on production
- Serialization and lot tracking
- Closed-loop feedback
- Real-time visibility across systems

---

## Gamification Ideas

### System Dashboard Views
- Show "PLM View", "MES View", "ERP View" as different screens
- Player switches between views to manage each system

### Integration Challenges
- **BOM Conflicts**: eBOM ≠ mBOM - player must reconcile
- **Stale Data**: Production using old revision - fix propagation
- **Inventory Mismatch**: ERP says available, MES says used - investigate

### Mini-Games
- **BOM Matching**: Connect parts between systems
- **Routing Puzzle**: Order manufacturing steps correctly
- **Material Allocation**: Optimize limited inventory across orders

### Scoring
- Points for smooth integration (no errors)
- Bonus for fast change propagation
- Penalties for production delays caused by data issues

---

## Implementation Notes

### Data Model Additions

```typescript
// Work Order
interface WorkOrder {
  id: string
  partId: string
  quantity: number
  status: 'planned' | 'released' | 'in-progress' | 'completed'
  routing: RoutingStep[]
  actuals: ProductionActuals
}

// Routing
interface RoutingStep {
  stepNumber: number
  workCenter: string
  description: string
  standardTime: number
}

// Inventory
interface InventoryItem {
  partId: string
  quantity: number
  location: string
  status: 'available' | 'allocated' | 'consumed'
}
```

### Store Extensions

Add to `gameStore.ts`:
- `workOrders: Record<string, WorkOrder>`
- `inventory: Record<string, InventoryItem>`
- `routings: Record<string, RoutingStep[]>`
- Functions: `createWorkOrder`, `allocateMaterials`, `completeWorkOrder`

---

## Priority for Implementation

1. **Story System (Phase 1)** - Character dialogue, achievements, narrative flow
2. **Act 5 (MES)** - Most aligned with existing gameplay
3. **Act 6 (ERP)** - Adds business layer complexity
4. **Act 7 (Digital Thread)** - Advanced integration concepts

---

# Story Implementation

## Implementation Plan

### Phase 1: Data Layer
- `src/data/story.ts` - Characters, dialogue, achievements
- `src/utils/types.ts` - Story types
- `src/store/gameStore.ts` - Story state

### Phase 2: Components
- `src/components/story/CharacterPanel.tsx` - Character display
- `src/components/story/DialogueBox.tsx` - Typewriter dialogue
- `src/components/story/AchievementToast.tsx` - Achievement popup

### Phase 3: Integration
- Update `useMission` hook with dialogue/achievement params
- Update all mission pages with story content

## Current Status

- [x] Planning complete
- [x] Phase 1: Data layer
- [x] Phase 2: Components  
- [x] Phase 3: Act 1 missions
- [x] Phase 4: Acts 2-4 (dialogue set up, needs content)
- [ ] Phase 5: Acts 5-7 (future)

---

# Original Roadmap

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
