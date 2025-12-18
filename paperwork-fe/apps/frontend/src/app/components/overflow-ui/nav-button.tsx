import * as React from 'react';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';

export type NavButtonSize = 'xxx-small' | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

export type NavButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  tooltip?: string;
  isSelected?: boolean;
  size?: NavButtonSize;
};

const sizeClass: Record<NavButtonSize, string> = {
  'xxx-small': 'h-6 w-6',
  'xx-small': 'h-7 w-7',
  'x-small': 'h-7 w-7',
  small: 'h-8 w-8',
  medium: 'h-9 w-9',
  large: 'h-10 w-10',
};

export function NavButton({ tooltip, isSelected, size = 'small', className, ...props }: NavButtonProps) {
  return (
    <Button
      {...props}
      type={props.type ?? 'button'}
      title={tooltip}
      variant="ghost"
      size="icon"
      className={clsx('text-muted-foreground hover:text-foreground', sizeClass[size], className, isSelected && 'bg-muted')}
    />
  );
}
