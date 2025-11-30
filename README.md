# Paperwork Frontend

Main frontend application workspace for the Paperwork project.

## Project Structure

This workspace contains multiple integrated subprojects:

- `paperwork-fe/` - Main application (based on synergycodes/workflowbuilder)
- `paperwork-ui/` - Local UI component library from [synergycodes/overflow-ui](https://github.com/synergycodes/overflow-ui)
  - **Not tracked by Git** - Core UI library for components, tokens, and design system
  - Used for local development and customization of UI components
  - To set up: See [Working with the UI Library](#working-with-the-ui-library) below
- `survey-creator/` - Reference repository from [surveyjs/survey-creator](https://github.com/surveyjs/survey-creator)
  - **Not tracked by Git** - Used as a reference for integrating survey/form builder functionality
  - To set up: `git clone https://github.com/surveyjs/survey-creator`
- `survey-library/` - Reference repository from [surveyjs/survey-library](https://github.com/surveyjs/survey-library)
  - **Not tracked by Git** - Core survey library used for survey/form functionality
  - To set up: `git clone https://github.com/surveyjs/survey-library`

## Getting Started

### Prerequisites

- Node.js (version specified in `package.json`)
- pnpm package manager

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   cd paperwork-fe
   pnpm install
   ```
3. Set up the UI library (see below)
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Working with the UI Library

The `paperwork-ui` directory contains the Overflow UI library for local development. This allows you to customize and modify UI components directly.

### Initial Setup

1. **Clone the UI library** (if not already present):
   ```bash
   cd "d:\Coding Files\GitHub\paperwork-fe"
   git clone https://github.com/synergycodes/overflow-ui.git paperwork-ui
   ```

2. **Install UI library dependencies**:
   ```bash
   cd paperwork-ui
   pnpm install
   ```

3. **Build the tokens package**:
   ```bash
   cd packages/tokens
   pnpm prepare
   ```

4. **Start the UI development build** (keeps running in background):
   ```bash
   cd ../..
   pnpm ui dev
   ```
   This watches for file changes and automatically rebuilds the UI library.

5. **Link to paperwork-fe** (already configured):
   - `apps/frontend/package.json` links to: `link:../../../paperwork-ui/packages/ui`
   - `apps/frontend/src/global.css` imports from: `../../../../paperwork-ui/packages/ui/dist/tokens.css`

6. **Reinstall paperwork-fe dependencies** to apply the local link:
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
   - Edit files in `paperwork-ui/packages/ui/src/`
   - Changes will automatically rebuild
   - Refresh your browser to see updates in paperwork-fe

3. **Work on the main application**:
   - In another terminal: `cd paperwork-fe && pnpm dev`
   - Changes to paperwork-fe will hot-reload as usual

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
- **Dependency issues**: Run `pnpm install` again in both directories
- **CSS not loading**: Verify the import path in `apps/frontend/src/global.css` points to `../../../../paperwork-ui/packages/ui/dist/tokens.css`

### UI Library Resources

- [NPM Package](https://www.npmjs.com/package/@synergycodes/overflow-ui)
- [GitHub Repository](https://github.com/synergycodes/overflow-ui)
- [Documentation](https://github.com/synergycodes/overflow-ui#readme)
