---
agent: agent
---
You are an expert in React, TypeScript, Vite, ReactFlow (@xyflow/react), Zustand state management, and the Overflow UI design system.

This is a Workflow Builder monorepo - a white-label visual workflow editor with drag-and-drop nodes, customizable layouts, and plugin architecture.

Project Structure & Architecture:

Monorepo using pnpm workspaces with apps: frontend, icons, types, tools
Visual diagram editor built on @xyflow/react (ReactFlow)
Plugin-based architecture with optional component/function plugins via withOptional*Plugins HOCs
State management via Zustand with slice pattern and middleware
UI built with @synergycodes/overflow-ui design system (not Tailwind or Next UI)
i18next for internationalization
Custom icon system with lazy-loaded SVG icons
Web component wrapper support for embedding in other apps
Key Principles:

Write concise, highly technical TypeScript code with accurate React examples
Use functional, declarative programming; avoid classes
Prefer iteration and modularization; avoid duplicated code
Use descriptive variables with auxiliary verbs (e.g. isLoading, onConnect)
Use kebab-case for directories and filenames (enforced by ESLint unicorn/filename-case)
Prefer named exports for components using function keyword
Use RORO pattern (Receive an Object, Return an Object) where applicable
TypeScript / JavaScript:

Use the function keyword for pure functions and React components
Omit semicolons (Prettier configured without semicolons)
All code uses TypeScript with strict typing
Props/types should preferably use interface (not type unless necessary)
Avoid enum; use maps or const objects instead
File structure: exported components first, subcomponents, helper functions, static content, type definitions
Avoid unnecessary curly braces in conditionals
For simple conditionals, use concise one-line syntax (e.g. if (condition) doSomething())
Error Handling & Validation:

Prioritize error and edge-case handling:
Handle errors and edge cases at the beginning of functions
Use early returns for error conditions to avoid deeply nested ifs
Keep the "happy path" at the end of the function
Avoid unnecessary else; use if-return pattern
Use guard clauses for preconditions and invalid states
Implement reasonable error logging and user-friendly messages via showSnackbar utility
React & Component Patterns:

Use functional components with interface for props
Define components with function keyword (not const)
Use declarative JSX with clear, semantic structure
Use @synergycodes/overflow-ui components for UI elements (not Tailwind or Next UI)
Manage styles with CSS Modules (.module.css files with CSS layers)
Place static content and interfaces at the end of files
Manage static content with variables defined outside render functions
Use lazy loading for heavy components (e.g. -lazy.tsx suffix pattern)
Use memo for performance optimization when appropriate
Leverage useCallback and useMemo extensively to prevent unnecessary re-renders
State Management (Zustand):

Use Zustand with slice pattern for organizing state
Access store via useStore(selector) with useShallow for multiple values
Create focused selectors to minimize re-renders
Use middleware pattern for cross-cutting concerns
Maintain immutability - use Immer's produce when needed (note: auto-freeze disabled for ReactFlow compatibility)
ReactFlow / Diagram Specifics:

Work with WorkflowBuilderNode and WorkflowBuilderEdge types
Use custom node types defined in getNodeTypesObject
Implement listeners for node changes, drag events via dedicated listener files
Handle connections, edges, and node changes through Zustand actions
Track changes via trackFutureChange for undo/redo functionality
Respect isReadOnlyMode flag for editor state
Plugin System:

Use withOptionalComponentPlugins and withOptionalFunctionPlugins for extensibility
Plugins should be self-contained in src/app/plugins/ directory
Register plugins via entry points that extend core functionality
Plugins can inject into: AppBar, Palette, PropertiesBar, Modals, and more
Styling & CSS:

Use CSS Modules with kebab-case class names
Organize styles using @layer (reset, ext-lib, ui with base and component sublayers)
Use Overflow UI design tokens via CSS variables (--ax-* prefix)
Custom variables use --wb-* prefix
Use clsx for conditional class composition
Maintain responsive design with CSS custom properties
Internationalization:

Use i18next and react-i18next for translations
Wrap translatable strings with t() function
Use useTranslateIfPossible hook for optional translation support
Store translation keys in organized namespaces
File Organization:

Group related files by feature in features/ directories
Co-locate tests, styles, and components
Use index.ts for clean exports
Maintain flat component structure within features
Keep utilities in dedicated utils/ directories
Hooks & Custom Logic:

Prefix custom hooks with use (e.g. usePaletteDrop, useFitView)
Keep hooks focused and single-purpose
Use useCallback for event handlers
Use useMemo for expensive computations
Leverage useShallow from Zustand for multi-value selectors
Development & Build:

Use Vite for dev server and builds
Support environment-specific file replacements via custom Vite plugin
Code obfuscation for plugins in production builds
Maintain strict TypeScript checking (tsc --noEmit)
Use ESLint with unicorn, TypeScript, and Prettier integration
Follow commit conventions with commitlint
Testing:

Use Vitest for unit/integration tests
Co-locate test files with components
Test user interactions and state changes
Mock external dependencies appropriately