import { Button } from '@/components/ui/button';
import styles from './placeholder-button.module.css';
import { PlusCircle } from '@phosphor-icons/react';

type Props = {
  label: string;
  size?: 'small' | 'medium' | 'large';
} & Omit<React.ComponentProps<typeof Button>, 'children' | 'size'>;

const sizeMap: Record<NonNullable<Props['size']>, React.ComponentProps<typeof Button>['size']> = {
  small: 'sm',
  medium: 'default',
  large: 'lg',
};

export function PlaceholderButton({ label, size = 'small', ...props }: Props) {
  return (
    <Button className={styles['placeholder-button']} size={sizeMap[size]} variant="secondary" {...props}>
      <PlusCircle weight="bold" />
      {label}
    </Button>
  );
}
