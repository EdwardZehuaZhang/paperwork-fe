import * as React from 'react';
import clsx from 'clsx';

import { X } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import type { SnackbarType } from './types';

export type SnackbarProps = {
  id?: string | number;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  variant?: SnackbarType;
  buttonLabel?: React.ReactNode;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  close?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'title'>;

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(function Snackbar(props, ref) {
  const {
    title,
    subtitle,
    buttonLabel,
    onButtonClick,
    close = true,
    onClose,
    action,
    className,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={clsx('flex w-full items-start gap-3 rounded-md border bg-background p-4', className)}
      {...rest}
    >
      <div className="min-w-0 flex-1">
        {title ? <div className="text-sm font-medium">{title}</div> : null}
        {subtitle ? <div className="text-sm text-muted-foreground">{subtitle}</div> : null}
      </div>
      {buttonLabel ? (
        <Button type="button" variant="secondary" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      ) : null}
      {action}
      {close && onClose ? (
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
          <X />
        </Button>
      ) : null}
    </div>
  );
});
