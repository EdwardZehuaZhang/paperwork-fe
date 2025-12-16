import * as React from 'react';

import { X } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { FooterVariant } from './types';

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  footerVariant?: FooterVariant;
  size?: 'regular' | 'large';
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, icon, footer, size = 'regular', children }: ModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose?.();
      }}
    >
      <DialogContent className={size === 'large' ? 'sm:max-w-2xl' : 'sm:max-w-lg'}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
          {onClose ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
              aria-label="Close"
            >
              <X />
            </Button>
          ) : null}
        </DialogHeader>

        {children}

        {footer ? <DialogFooter>{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  );
}
