import * as React from 'react';

export type DatePickerProps = {
  value?: Date | string | null;
  onChange: (value: Date | null) => void;
  disabled?: boolean;
  className?: string;
};

function formatDateForInput(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function DatePicker({ value, onChange, disabled, className }: DatePickerProps) {
  const stringValue = React.useMemo(() => {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    return Number.isNaN(date.getTime()) ? '' : formatDateForInput(date);
  }, [value]);

  return (
    <input
      type="date"
      className={className}
      disabled={disabled}
      value={stringValue}
      onChange={(e) => {
        if (!e.target.value) return onChange(null);
        const next = new Date(e.target.value);
        onChange(Number.isNaN(next.getTime()) ? null : next);
      }}
    />
  );
}
