import * as React from 'react';
import clsx from 'clsx';

export type SelectItem<T = string> = {
  label: React.ReactNode;
  value: T;
  disabled?: boolean;
};

export type SelectProps<T = string> = Omit<React.ComponentPropsWithoutRef<'select'>, 'value' | 'onChange'> & {
  items: Array<SelectItem<T>>;
  value?: T;
  placeholder?: string;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>, value: T) => void;
};

export function Select<T = string>({
  items,
  value,
  placeholder,
  error,
  onChange,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <select
      {...props}
      className={clsx(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive',
        className,
      )}
      value={(value as unknown as string) ?? ''}
      onChange={(event_) => {
        const nextValue = (event_.target.value as unknown as T) ?? ('' as unknown as T);
        onChange?.(event_, nextValue);
      }}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {items.map((item) => (
        <option key={String(item.value)} value={String(item.value)} disabled={item.disabled}>
          {String(item.label)}
        </option>
      ))}
    </select>
  );
}
