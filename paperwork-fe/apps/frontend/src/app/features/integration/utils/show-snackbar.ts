import { showSnackbar } from '@/utils/show-snackbar';
import { OnSaveParams } from '../types';

export function showSnackbarSaveSuccessIfNeeded(savingParams?: OnSaveParams) {
  if (savingParams?.isAutoSave) {
    return;
  }

  showSnackbar({
    title: 'saveDiagramSuccess',
    variant: 'success',
  });
}

export function showSnackbarSaveErrorIfNeeded(savingParams?: OnSaveParams) {
  if (savingParams?.isAutoSave) {
    return;
  }

  showSnackbar({
    title: 'saveDiagramError',
    variant: 'error',
  });
}
