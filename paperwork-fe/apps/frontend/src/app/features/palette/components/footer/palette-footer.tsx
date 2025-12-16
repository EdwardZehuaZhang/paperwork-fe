import styles from './palette-footer.module.css';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { OptionalFooterContent } from '@/features/plugins-core/components/optional-footer-content';

type Props = {
  onTemplateClick: () => void;
};

export function PaletteFooter({ onTemplateClick }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <OptionalFooterContent>
        <Button variant="secondary" onClick={onTemplateClick} size="sm">
          {t('palette.templates')}
        </Button>
      </OptionalFooterContent>
    </div>
  );
}
