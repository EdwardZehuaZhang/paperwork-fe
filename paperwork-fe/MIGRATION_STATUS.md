# Overflow UI to Shadcn Migration Progress

## Completed ✅

### 1. Extracted Diagram-Specific Components to Local Package
**Location:** `apps/frontend/src/app/features/diagram/ui-components/`

All diagram-specific components have been extracted from `@synergycodes/overflow-ui` and are now maintained locally:

#### Node Components:
- ✅ `NodePanel` - Compound component for node layout structure (Root, Header, Content, Handles)
- ✅ `NodeDescription` - Label and description display for nodes
- ✅ `NodeIcon` - Icon container with consistent styling
- ✅ `Status` - Validation status indicator with invalid state
- ✅ `NodeAsPortWrapper` - ReactFlow-specific wrapper for node-as-port behavior

#### Edge Components:
- ✅ `EdgeLabel` - Label component for ReactFlow edges with size variants
- ✅ `useEdgeStyle` - Hook for computing edge CSS styles based on state
- ✅ `EdgeState` type - Type definitions for edge states

**Files Updated (14 files):**
1. `nodes/ai-agent-node-template/ai-agent-node-template.tsx`
2. `nodes/decision-node-template/decision-node-template.tsx`
3. `nodes/workflow-node-template/workflow-node-template.tsx`
4. `nodes/node-container.tsx`
5. `nodes/ai-node-container.tsx`
6. `nodes/decision-node-container.tsx`
7. `edges/temporary-edge/temporary-edge.tsx`
8. `edges/self-connecting-edge/self-connecting-edge.tsx`
9. `edges/edge-label-renderer/edge-label-renderer.tsx`

### 2. Migrated Button Component (11 files)
All `Button` imports have been migrated to use local shadcn `Button`:

**Files Updated:**
1. `features/modals/delete-confirmation/delete-confirmation.tsx`
2. `features/palette/components/footer/palette-footer.tsx`
3. `features/diagram/nodes/components/placeholder-button/placeholder-button.tsx`
4. `features/integration/components/import-export/export-modal/export-modal.tsx`
5. `features/integration/components/import-export/import-modal/import-modal.tsx`
6. `features/json-form/controls/dynamic-conditions-control/dynamic-condition-modal-footer/condition-modal-footer.tsx`
7. `features/json-form/controls/dynamic-conditions-control/dynamic-conditions-form/conditions-form.tsx`
8. `features/json-form/controls/ai-tools-control/ai-tools-control.tsx`
9. `features/json-form/controls/ai-tools-control/components/add-ai-tool-footer/add-ai-tool-footer.tsx`
10. `plugins/help/components/footer-support-button.tsx`
11. `plugins/help/modals/sales-contact/sales-contact.tsx`

### 3. Migrated Checkbox and Avatar (2 files)
- ✅ Checkbox - `features/modals/delete-confirmation/delete-confirmation.tsx`
- ✅ Avatar - `plugins/help/modals/sales-contact/sales-contact.tsx`

### 4. Migrated Collapsible Component (2 files)
Collapsible imports updated to use local shadcn version:
1. `nodes/ai-agent-node-template/ai-agent-node-template.tsx`
2. `nodes/workflow-node-template/workflow-node-template.tsx`

---

## Remaining Components to Migrate ⚠️

### Complex Components (Need Extraction or Adaptation)

These components have complex logic and should be extracted to local components first, with styling migration handled later:

#### 1. **NavButton** (15 files) - MEDIUM COMPLEXITY
- **Current Usage:** Polymorphic button that auto-detects content type
- **Strategy:** Create custom component using shadcn Button as base
- **Files:**
  - `features/palette/components/header/palette-header.tsx`
  - `features/integration/components/save-button/save-button.tsx`
  - `features/i18n/components/language-selector/language-selector.tsx`
  - `features/app-bar/components/project-selection/project-selection.tsx`
  - `features/app-bar/components/controls/controls.tsx`
  - `features/json-form/controls/decision-branches-control/branch-card/branch-card.tsx`
  - `features/json-form/controls/dynamic-conditions-control/dynamic-conditions-control.tsx`
  - `features/json-form/controls/dynamic-conditions-control/dynamic-conditions-form-field/conditions-form-field.tsx`
  - `features/properties-bar/components/header/properties-bar-header.tsx`
  - `plugins/help/components/app-bar/get-app-bar-button.tsx`

#### 2. **Menu** (5 files) - MEDIUM COMPLEXITY
- **Current Usage:** Dropdown menu with items array (declarative)
- **Strategy:** Use shadcn DropdownMenu (compound components)
- **Files:**
  - `features/i18n/components/language-selector/language-selector.tsx`
  - `features/app-bar/components/project-selection/project-selection.tsx`
  - `features/app-bar/components/controls/controls.tsx`

#### 3. **Input** (7 files) - EASY
- **Current Usage:** Standard text input
- **Strategy:** Direct replacement with shadcn Input
- **Files:**
  - `features/app-bar/components/project-selection/project-selection.tsx`
  - `features/properties-bar/components/edge-properties/edge-properties.tsx`
  - `features/json-form/controls/dynamic-conditions-control/dynamic-conditions-form-field/conditions-form-field.tsx`
  - `features/json-form/controls/ai-tools-control/components/add-ai-tool-form-content/add-ai-tool-form-content.tsx`

#### 4. **TextArea** (4 files) - EASY
- **Current Usage:** Multi-line text input
- **Strategy:** Direct replacement with shadcn Textarea
- **Files:**
  - `features/syntax-highlighter/components/syntax-highlighter-lazy.tsx`
  - `features/json-form/controls/dynamic-conditions-control/dynamic-conditions-control.tsx`
  - `features/json-form/controls/ai-tools-control/components/add-ai-tool-form-content/add-ai-tool-form-content.tsx`

#### 5. **Select** (3 files) - MEDIUM
- **Current Usage:** Simple select with options array
- **Strategy:** Adapt to shadcn Select (compound components)
- **Files:**
  - `features/json-form/controls/dynamic-conditions-control/dynamic-conditions-form-field/conditions-form-field.tsx`
  - `features/json-form/controls/ai-tools-control/components/add-ai-tool-form-content/add-ai-tool-form-content.tsx`

#### 6. **Accordion** (2 files) - EASY
- **Current Usage:** Collapsible sections
- **Strategy:** Direct replacement with shadcn Accordion
- **Files:**
  - `features/json-form/controls/form-body-control/form-body-control.tsx`
  - `features/json-form/layouts/accordion-layout/accordion-layout.tsx`

#### 7. **Modal** (1 file) - EASY
- **Current Usage:** Dialog/modal component
- **Strategy:** Use shadcn Dialog
- **Files:**
  - `features/modals/providers/modal-provider.tsx`

#### 8. **Snackbar** (3 files) - MEDIUM
- **Current Usage:** Toast notifications (declarative)
- **Strategy:** Migrate to shadcn Sonner (imperative API)
- **Files:**
  - `utils/show-snackbar.tsx`
  - `features/snackbar/snackbar-container.tsx`
  - (+ SnackbarType imports in 2 files)

#### 9. **IconSwitch** (2 files) - MEDIUM
- **Current Usage:** Switch with icon variants
- **Strategy:** Create custom wrapper around shadcn Switch
- **Files:**
  - `features/app-bar/components/toggle-dark-mode/toggle-dark-mode.tsx`
  - `features/app-bar/components/toggle-read-only-mode/toggle-read-only-mode.tsx`

#### 10. **SegmentPicker** (2 files) - MEDIUM
- **Current Usage:** Segmented control for option selection
- **Strategy:** Use shadcn ToggleGroup
- **Files:**
  - `features/properties-bar/components/properties-bar/properties-bar.tsx`
  - `features/json-form/controls/dynamic-conditions-control/dynamic-conditions-form-field/conditions-form-field.tsx`

#### 11. **DatePicker** (1 file) - MEDIUM
- **Current Usage:** Date selection component
- **Strategy:** Use shadcn Calendar + Popover pattern
- **Files:**
  - `features/json-form/controls/date-picker-control/date-picker-control.tsx`

### Type-Only Imports (5 files) - EASY
These are just type definitions and can be replaced with local types:
- **MenuItemProps** (3 files)
- **ItemSize** (2 files)
- **SnackbarType** (1 file)

---

## Next Steps

### Phase 1: Form Components (2-3 days)
1. Migrate Input, TextArea, Select to shadcn equivalents
2. Test form interactions in json-form controls
3. Update properties-bar components

### Phase 2: Navigation & Controls (2-3 days)
1. Create custom NavButton wrapper component
2. Migrate Menu to DropdownMenu (refactor items array → compound)
3. Create IconSwitch wrapper around Switch
4. Migrate SegmentPicker to ToggleGroup

### Phase 3: Layout & Feedback (2 days)
1. Migrate Accordion to shadcn
2. Migrate Modal to Dialog
3. Migrate Snackbar to Sonner (paradigm shift)
4. Migrate DatePicker to Calendar + Popover

### Phase 4: Types & Cleanup (1 day)
1. Create local type definitions for ItemSize, MenuItemProps
2. Remove @synergycodes/overflow-ui dependency
3. Remove paperwork-ui workspace link
4. Final testing

---

## Migration Strategy

### For Simple Components (Input, TextArea, Accordion, Modal):
✅ Direct replacement with minimal changes
✅ Props are mostly compatible
✅ Low risk

### For Complex Components (NavButton, Menu, SegmentPicker):
⚠️ Extract to local components first
⚠️ Maintain existing functionality
⚠️ Update styling later

### For Paradigm-Shift Components (Snackbar → Sonner):
⚠️ Requires refactoring from declarative to imperative
⚠️ Need to update all call sites
⚠️ Medium risk

---

## Files Summary

**Total Files:** 58 files using @synergycodes/overflow-ui
**Migrated:** 27 files (47%)
**Remaining:** 31 files (53%)

**By Category:**
- ✅ Diagram Components: 14 files (100% complete)
- ✅ Button: 11 files (100% complete)
- ✅ Checkbox/Avatar/Collapsible: 4 files (100% complete)
- ⚠️ NavButton: 15 files (0% complete)
- ⚠️ Input/TextArea/Select: 14 files (0% complete)
- ⚠️ Menu/Modal/Snackbar/Other: 7 files (0% complete)

**Estimated Remaining Effort:** 7-9 days for complete migration
