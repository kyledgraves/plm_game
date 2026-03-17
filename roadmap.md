# Roadmap

## Current Status (v1.0)

The game has a functional core with:
- 20 missions across 4 Acts
- Part creation and management
- Bill of Materials (BOM) building
- Change management workflow
- Configuration management
- Progress tracking and scoring

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

1. **Act 5 (MES)** - Most aligned with existing gameplay
2. **Act 6 (ERP)** - Adds business layer complexity
3. **Act 7 (Digital Thread)** - Advanced integration concepts

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
