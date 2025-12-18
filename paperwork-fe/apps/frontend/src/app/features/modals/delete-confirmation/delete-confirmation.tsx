import { Node, Edge } from '@xyflow/react';
import styles from './delete-confirmation.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type DeleteConfirmationProps = {
  nodes: Node[];
  edges: Edge[];
  onShouldShowAgainChange?: (value: boolean) => void;
};

export function DeleteConfirmation({ nodes, edges, onShouldShowAgainChange }: DeleteConfirmationProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();

  const parts = [
    nodes.length > 0 ? t(`deleteConfirmation.${nodes.length > 1 ? 'nodes' : 'node'}`) : '',
    edges.length > 0 ? t(`deleteConfirmation.${edges.length > 1 ? 'edges' : 'edge'}`) : '',
  ].filter(Boolean);

  const translatedParts = parts.join(` ${t('deleteConfirmation.andConnected')} `);
  const selectedText = t(`deleteConfirmation.${nodes.length > 1 ? 'selectedPlural' : 'selected'}`);

  return (
    <div className={styles['content']}>
      <span>
        <Trans
          i18nKey="deleteConfirmation.text"
          values={{ selected: selectedText, parts: translatedParts }}
          components={{ b: <b /> }}
        />
      </span>
      <div className={styles['checkbox-wrapper']}>
        <Checkbox
          id="dont-show-again-checkbox"
          checked={isChecked}
          onCheckedChange={(checked) => {
            const newValue = checked === true;
            setIsChecked(newValue);
            onShouldShowAgainChange?.(newValue);
          }}
        />
        <label htmlFor="dont-show-again-checkbox">{t('deleteConfirmation.dontShowMeThisAgain')}</label>
      </div>
    </div>
  );
}

type DeleteConfirmationButtonsProps = {
  onDeleteClick: () => void;
  onCancelClick: () => void;
};

export function DeleteConfirmationButtons({ onDeleteClick, onCancelClick }: DeleteConfirmationButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className={styles['buttons']}>
      <Button variant="secondary" onClick={onCancelClick}>
        {t('deleteConfirmation.cancel')}
      </Button>
      <Button onClick={onDeleteClick} variant="destructive" autoFocus>
        {t('deleteConfirmation.delete')}
      </Button>
    </div>
  );
}
