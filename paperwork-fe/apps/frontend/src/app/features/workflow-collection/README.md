# Workflow Collection Feature

## Overview

The Workflow Collection feature provides a centralized page for managing and organizing workflow templates. This parent page allows users to browse, search, filter, and manage their saved workflows before editing them in the node editor.

## Features Implemented

### 1. Workflow Collection Page (`/workflows`)

A fully-featured collection management page with:

#### Display Options
- **Grid View**: Cards layout showing 3 workflows per row (default)
- **List View**: Compact list layout for browsing many workflows
- **View Toggle**: Switch between grid and list views

#### Workflow Cards Display
Each workflow card shows:
- Workflow name
- Date last modified (with human-friendly formatting)
- Thumbnail icon (randomly assigned from available icons)
- Number of nodes in the workflow
- Category badge
- Tags (up to 3 displayed)

#### Search & Filtering
- **Search Bar**: Full-text search across workflow names and tags
- **Category Filter**: Dropdown to filter by workflow category (HR, Finance, Legal, etc.)
- **Sort Options**:
  - Date (Newest/Oldest)
  - Name (A-Z/Z-A)

#### Card Actions
- **Click Card**: Navigate to node editor and load the workflow
- **Share Icon**: Generate and copy shareable link to clipboard
- **Three-Dot Menu**:
  - **Rename**: Open dialog to rename the workflow
  - **Duplicate**: Create a copy of the workflow
  - **Delete**: Remove workflow (with confirmation dialog)

#### Top Actions
- **Create New Workflow**: Button to start a fresh workflow in the editor

### 2. Mock API & Storage System

**File**: `apps/frontend/src/app/features/workflow-collection/api/workflow-storage.ts`

A complete mock backend API system using localStorage:

#### Methods
- `getAll()`: Retrieve all workflows
- `getById(id)`: Get a specific workflow
- `save(workflow)`: Create or update a workflow
- `create(data)`: Create new workflow from editor state
- `delete(id)`: Remove a workflow
- `duplicate(id)`: Clone an existing workflow
- `rename(id, newName)`: Update workflow name

#### Sample Data
Includes 6 pre-populated sample workflows:
- Employee Onboarding
- Expense Claim Process
- Leave Application
- Purchase Order Approval
- Invoice Processing
- Contract Review

### 3. Routing System

**Files**: 
- `apps/frontend/src/app/router/router-context.tsx`
- `apps/frontend/src/app/app-router.tsx`

A lightweight routing solution integrated into the app:

#### Routes
- `/`: Workflow editor (node page)
- `/workflows`: Workflow collection page

#### Features
- Browser history integration (back/forward buttons work)
- URL-based routing
- Unsaved changes detection
- Save prompts when navigating away

### 4. Navigation Integration

**Updated File**: `apps/frontend/src/app/features/app-bar/shadcn-app-bar.tsx`

- Folder icon in navbar now navigates to `/workflows`
- Prompts user to save changes before navigating
- Seamless integration with existing UI

## Data Structure

### Workflow Interface
```typescript
interface Workflow {
  id: string;
  name: string;
  dateModified: Date;
  dateCreated: Date;
  nodeCount: number;
  thumbnailIcon: string;
  category?: string;
  tags?: string[];
  data: IntegrationDataFormat; // Full workflow data including nodes, edges, layout
}
```

### IntegrationDataFormat
```typescript
type IntegrationDataFormat = {
  name: string;
  layoutDirection: LayoutDirection;
  nodes: WorkflowBuilderNode[];
  edges: WorkflowBuilderEdge[];
};
```

## File Structure

```
apps/frontend/src/app/
├── features/
│   └── workflow-collection/
│       ├── workflow-collection-page.tsx  # Main collection page component
│       ├── types.ts                      # TypeScript interfaces
│       ├── index.ts                      # Public exports
│       ├── api/
│       │   └── workflow-storage.ts       # Mock API & storage
│       └── hooks/
│           └── use-workflow-manager.ts   # Workflow management hook
├── router/
│   └── router-context.tsx                # Routing context provider
├── app-router.tsx                        # Main routing logic
└── app.tsx                               # Updated with router integration
```

## Usage

### Navigating to Workflow Collection
1. Click the folder icon in the navbar
2. If there are unsaved changes, you'll be prompted to save
3. The workflow collection page will load at `/workflows`

### Creating a New Workflow
1. Click "Create New Workflow" button
2. Redirects to node editor with blank canvas
3. Build your workflow using the node editor

### Opening an Existing Workflow
1. Click any workflow card
2. The workflow loads into the node editor
3. Edit as needed

### Managing Workflows
- **Search**: Type in search bar to filter by name or tags
- **Filter by Category**: Select from dropdown
- **Sort**: Choose preferred sort order
- **Share**: Click share icon to copy link
- **Rename/Duplicate/Delete**: Use three-dot menu

## Saving Workflows

Workflows are automatically saved to localStorage when:
1. You navigate away from the editor (with prompt)
2. You explicitly click the save button in the navbar
3. Auto-save is triggered (if enabled)

## Future Enhancements

### Planned Features
1. **Backend Integration**: Replace localStorage with real API calls
2. **Workflow Templates**: Pre-built workflow templates
3. **Collaboration**: Share workflows with team members
4. **Versioning**: Track workflow history and changes
5. **Advanced Search**: Full-text search across workflow content
6. **Bulk Operations**: Select multiple workflows for batch actions
7. **Export/Import**: Download workflows as JSON files
8. **Workflow Statistics**: Usage analytics and insights
9. **Favorites**: Star frequently used workflows
10. **Recent Workflows**: Quick access to recently edited workflows

### Technical Improvements
1. **Proper Router Library**: Integrate React Router or similar
2. **State Management**: Consider Redux/Zustand for workflow state
3. **Caching**: Implement proper caching strategy
4. **Lazy Loading**: Paginate workflow list for better performance
5. **Offline Support**: PWA capabilities with service workers

## Design Decisions

### Why Custom Routing?
- No routing library was installed in the project
- Simple, lightweight solution for two routes
- Easy to replace with proper router later
- Integrates seamlessly with existing architecture

### Why localStorage?
- Quick prototyping without backend dependencies
- Easy to demo and test
- Data persists between sessions
- Simple migration path to real backend

### Why Overflow UI + Shadcn?
- Project already uses this hybrid approach
- Consistent with existing design system
- Leverages Tailwind CSS for styling
- Professional, modern look and feel

## Testing

To test the workflow collection feature:

1. Start the development server:
   ```bash
   cd paperwork-fe
   pnpm dev
   ```

2. Open browser to `http://localhost:4200`

3. Click the folder icon in navbar to access `/workflows`

4. Try the sample workflows or create new ones

5. Test all CRUD operations (Create, Read, Update, Delete)

## Troubleshooting

### Workflows not appearing
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`
- Refresh page to reload sample data

### Routing not working
- Ensure `RouterProvider` wraps the app in `app.tsx`
- Check browser URL shows correct path
- Verify `AppRouter` component is rendering

### Save not working
- Check that `WorkflowStorageAPI.create()` is being called
- Verify data format matches `IntegrationDataFormat`
- Check localStorage in browser DevTools

## Contributing

When adding new features:

1. Update type definitions in `types.ts`
2. Add API methods to `workflow-storage.ts`
3. Update UI components as needed
4. Test all user flows
5. Update this documentation

## License

Same as parent project.
