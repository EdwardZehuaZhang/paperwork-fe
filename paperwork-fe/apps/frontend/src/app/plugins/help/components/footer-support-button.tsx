import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { openHelpModal } from '../functions/open-help-modal';

export function FooterSupportButton() {
  const { t } = useTranslation();

  return (
    <Button variant="secondary" onClick={openHelpModal} size="sm">
      {t('plugins.help.helpSupport')}
    </Button>
  );
}
