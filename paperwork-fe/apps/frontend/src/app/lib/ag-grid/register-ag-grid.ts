import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

declare global {
  // Prevent double-registration across HMR / multiple imports.
  // eslint-disable-next-line no-var
  var __paperworkAgGridModulesRegistered: boolean | undefined;
}

export function ensureAgGridModulesRegistered(): void {
  if (globalThis.__paperworkAgGridModulesRegistered) return;
  ModuleRegistry.registerModules([AllCommunityModule]);
  globalThis.__paperworkAgGridModulesRegistered = true;
}
