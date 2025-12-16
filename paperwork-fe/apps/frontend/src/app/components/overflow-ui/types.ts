export type ItemSize = 'small' | 'medium' | 'large';

export type FooterVariant = 'integrated' | 'separated';

export const SnackbarType = {
	DEFAULT: 'default',
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error',
} as const;

export type SnackbarType = (typeof SnackbarType)[keyof typeof SnackbarType];
