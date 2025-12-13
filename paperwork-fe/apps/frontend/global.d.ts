/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare global {
	// AppRouter exposes these for the AppBar to call without tight coupling.
	// eslint-disable-next-line no-var
	var __navigateToCollection: undefined | (() => void);
	// eslint-disable-next-line no-var
	var __persistWorkflowToCollection: undefined | (() => Promise<unknown>);
}

export {};
