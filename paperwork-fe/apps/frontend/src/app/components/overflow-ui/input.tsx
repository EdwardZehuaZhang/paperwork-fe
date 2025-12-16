import * as React from 'react';
import clsx from 'clsx';

import { Input as ShadcnInput } from '@/components/ui/input';

export type InputProps = React.ComponentPropsWithoutRef<typeof ShadcnInput> & {
  error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, className, ...props },
  ref,
) {
  return (
    <ShadcnInput
      ref={ref}
      className={clsx(className, error && 'border-destructive')}
      {...props}
    />
  );
});
