import * as React from 'react';
import clsx from 'clsx';

import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';

export type TextAreaProps = React.ComponentPropsWithoutRef<typeof ShadcnTextarea> & {
  error?: boolean;
  minRows?: number;
  maxRows?: number;
  size?: 'small' | 'medium' | 'large';
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { error, minRows, maxRows: _maxRows, size: _size, className, ...props },
  ref,
) {
  return (
    <ShadcnTextarea
      ref={ref}
      rows={minRows}
      className={clsx(className, error && 'border-destructive')}
      {...props}
    />
  );
});
