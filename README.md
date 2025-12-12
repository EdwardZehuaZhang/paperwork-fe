# Paperwork Frontend

Main frontend application workspace for the Paperwork project with integrated shadcn/ui components and design system.

## Project Structure

This workspace contains two integrated projects:

- `paperwork-fe/` - Main frontend application built with React, Vite, and shadcn/ui
- `paperwork-ui/` - Local UI component library ([synergycodes/overflow-ui](https://github.com/synergycodes/overflow-ui))
  - Contains shadcn/ui component collection with 50+ pre-built components
  - Includes design tokens, themes, and charts
  - Provides dashboard blocks, form layouts, sidebar variants, and more
  - Used for local development and customization of UI components

## Getting Started

### Prerequisites

- Node.js (version specified in `package.json`)
- pnpm package manager

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up the UI library (see below)
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Working with the UI Library and shadcn/ui Components

The `paperwork-ui` directory contains the Overflow UI library with integrated shadcn/ui components for local development.

### Initial Setup

1. **Install UI library dependencies** (automatically done with workspace pnpm install):
   ```bash
   cd paperwork-ui
   pnpm install
   ```

2. **Build the tokens package**:
   ```bash
   cd packages/tokens
   pnpm prepare
   ```

3. **Start the UI development build** (keeps running in background):
   ```bash
   cd ../..
   pnpm ui dev
   ```
   This watches for file changes in the UI library and automatically rebuilds.

4. **Link to paperwork-fe** (already configured in workspace):
   - `paperwork-fe/apps/frontend/package.json` links to: `link:../../../paperwork-ui/packages/ui`
   - `paperwork-fe/apps/frontend/src/global.css` imports from: `../../../../paperwork-ui/packages/ui/dist/tokens.css`

5. **Reinstall paperwork-fe dependencies** to apply the local link:
   ```bash
   cd ../paperwork-fe
   pnpm install
   ```

### Development Workflow

When working with both `paperwork-fe` and `paperwork-ui` locally:

1. **Keep UI dev build running**:
   - In one terminal: `cd paperwork-ui && pnpm ui dev`
   - This watches for changes and rebuilds automatically

2. **Make changes to UI components**:
   - Edit files in `paperwork-ui/packages/ui/src/components/shadcn/`
   - Changes will automatically rebuild
   - Refresh your browser to see updates in paperwork-fe

3. **Work on the main application**:
   - In another terminal: `cd paperwork-fe && pnpm dev`
   - Changes to paperwork-fe will hot-reload as usual

### Available shadcn/ui Components

The `paperwork-ui` library includes a comprehensive set of shadcn/ui components:

**Form & Input Components:**
- Button, Button Group
- Input, Input Group, Input OTP, Native Select
- Textarea, Field, Form
- Checkbox, Radio Group
- Toggle, Toggle Group
- Switch, Slider
- Dropdown Menu, Select, Menubar, Navigation Menu, Context Menu

**Layout Components:**
- Card, Accordion, Collapsible
- Dialog, Drawer, Sheet
- Popover, Hover Card, Tooltip
- Pagination, Separator
- Sidebar, Scroll Area, Resizable

**Display Components:**
- Alert, Alert Dialog
- Badge, Skeleton
- Spinner, Progress
- Table, Breadcrumb, Kbd
- Avatar, Carousel
- Empty (empty state)

**Advanced Components:**
- Command (command palette)
- Charts (area, bar, line, pie, radar, radial)
- Calendar
- Sonner (toast notifications)

**Pre-built Blocks:**
- Dashboard layouts (01)
- Login forms (01-05 variants)
- Signup forms (01-05 variants)
- Calendar layouts (01-32 variants)
- OTP forms (01-05 variants)
- Product tables, sidebar variants (01-16 variants)

### Switching Between Local and NPM Package

**Using local UI library** (for development):
```json
// apps/frontend/package.json
"@synergycodes/overflow-ui": "link:../../../paperwork-ui/packages/ui"
```

**Using published NPM package** (for production):
```json
// apps/frontend/package.json
"@synergycodes/overflow-ui": "^1.0.0-beta.22"
```

After changing, run `pnpm install` in the `paperwork-fe` directory.

### Troubleshooting

- **UI changes not reflecting**: Ensure `pnpm ui dev` is running in the paperwork-ui directory
- **Build errors**: Try rebuilding tokens with `cd paperwork-ui/packages/tokens && pnpm prepare`
- **Dependency issues**: Run `pnpm install` again in the root directory
- **CSS not loading**: Verify the import path in `paperwork-fe/apps/frontend/src/global.css` points to `../../../../paperwork-ui/packages/ui/dist/tokens.css`
- **Components not found**: Make sure paperwork-ui is properly linked as a workspace dependency

### UI Library Resources

- **NPM Package**: [@synergycodes/overflow-ui](https://www.npmjs.com/package/@synergycodes/overflow-ui)
- **GitHub**: [synergycodes/overflow-ui](https://github.com/synergycodes/overflow-ui)
- **shadcn/ui**: [shadcn/ui Documentation](https://ui.shadcn.com)
