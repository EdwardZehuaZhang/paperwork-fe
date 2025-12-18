import styles from './palette-header.module.css';
import { Icon } from '@workflow-builder/icons';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

type PaletteHeaderProps = {
  onClick: () => void;
  isSidebarExpanded: boolean;
};

export function PaletteHeader({ onClick, isSidebarExpanded }: PaletteHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <span className="text-sm font-medium leading-none">{t('palette.nodesLibrary')}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onClick}
        title={isSidebarExpanded ? t('tooltips.closePalette') : t('tooltips.openPalette')}
        aria-label={isSidebarExpanded ? t('tooltips.closePalette') : t('tooltips.openPalette')}
      >
        <Icon name="SidebarSimple" />
      </Button>
    </div>
  );
}
