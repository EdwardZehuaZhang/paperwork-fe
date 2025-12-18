import styles from './properties-bar-header.module.css';

import { Icon } from '@workflow-builder/icons';
import { Button } from '@/components/ui/button';

type Props = {
  header: string;
  name: string;
  isExpanded: boolean;
  onDotsClick?: () => void;
};

export function PropertiesBarHeader({ isExpanded, header, name, onDotsClick }: Props) {
  return (
    <div className={styles['header']}>
      <div className={styles['text-container']}>
        <span className="text-sm font-medium leading-none">{header}</span>
        {isExpanded && name && <p className="text-xs text-muted-foreground">{name}</p>}
      </div>
      {onDotsClick && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onDotsClick}
          aria-label="More options"
        >
          <Icon name="DotsThreeVertical" />
        </Button>
      )}
    </div>
  );
}
