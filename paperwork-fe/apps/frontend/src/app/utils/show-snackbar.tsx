import i18n from 'i18next';
import { toast } from 'sonner';

import type { SnackbarProps } from '@/components/overflow-ui';
import type { DefaultTranslationMap } from '@/features/i18n/i18next';

const AUTO_HIDE_DURATION_TIME = 3000;

const SNACKBAR_PREFIX = `snackbar` as const;
type SnackbarKey = keyof DefaultTranslationMap[typeof SNACKBAR_PREFIX];

type ShowSnackbarProps = Omit<SnackbarProps, 'title'> & {
  title: SnackbarKey;
  autoHideDuration?: number;
  preventDuplicate?: boolean;
};

export function showSnackbar({
  title,
  variant,
  subtitle,
  buttonLabel,
  onButtonClick,
  close = true,
  autoHideDuration = AUTO_HIDE_DURATION_TIME,
  preventDuplicate = true,
}: ShowSnackbarProps) {
  const message = i18n.t(`${SNACKBAR_PREFIX}.${title}`);
  const id = preventDuplicate ? `${SNACKBAR_PREFIX}:${title}:${variant ?? 'default'}` : undefined;

  const toastOptions = {
    id,
    description: subtitle,
    duration: autoHideDuration,
    dismissible: close,
    action:
      buttonLabel && onButtonClick
        ? {
            label: buttonLabel,
            onClick: () => onButtonClick(undefined as never),
          }
        : undefined,
  };

  switch (variant) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
}
