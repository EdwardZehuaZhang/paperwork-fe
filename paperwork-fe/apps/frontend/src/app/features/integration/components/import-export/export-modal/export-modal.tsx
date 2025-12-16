import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { showSnackbar } from '@/utils/show-snackbar';
import { Icon } from '@workflow-builder/icons';
import { Button } from '@/components/ui/button';

import { getStoreDataForIntegration } from '@/store/slices/diagram-slice/actions';
import { SyntaxHighlighterLazy } from '@/features/syntax-highlighter/components/syntax-highlighter-lazy';
import { copy } from '@/utils/copy';
import { noop } from '@/utils/noop';

import styles from './export-modal.module.css';

export function ExportModal() {
  const { t } = useTranslation();

  const storeData = useMemo(() => {
    return JSON.stringify(getStoreDataForIntegration(), null, 2);
  }, []);

  const handleCopy = useCallback(() => {
    copy(storeData);

    showSnackbar({
      title: 'contentCopied',
      variant: 'success',
    });
  }, [storeData]);

  return (
    <div className={styles['container']}>
      <SyntaxHighlighterLazy value={storeData} onChange={noop} isDisabled />
      <div className={styles['actions']}>
        <Button onClick={handleCopy}>
          <Icon name="Copy" />
          {t('tooltips.copy')}
        </Button>
      </div>
    </div>
  );
}
