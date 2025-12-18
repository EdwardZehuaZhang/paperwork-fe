import * as React from 'react';
import clsx from 'clsx';

export type SegmentPickerItemProps = {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
};

function SegmentPickerItem(_props: SegmentPickerItemProps) {
  return null;
}

export type SegmentPickerProps = {
  value: string;
  onChange: (event: React.SyntheticEvent | null, value: string) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: 'xxx-small' | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
};

const containerSizeClass: Record<NonNullable<SegmentPickerProps['size']>, string> = {
  'xxx-small': 'p-0.5',
  'xx-small': 'p-0.5',
  'x-small': 'p-1',
  small: 'p-1',
  medium: 'p-1',
  large: 'p-1',
};

const itemSizeClass: Record<NonNullable<SegmentPickerProps['size']>, string> = {
  'xxx-small': 'px-1.5 py-0.5 text-[10px] leading-none',
  'xx-small': 'px-2 py-0.5 text-xs',
  'x-small': 'px-2 py-1 text-xs',
  small: 'px-2 py-1 text-xs',
  medium: 'px-3 py-1.5 text-sm',
  large: 'px-3 py-2 text-sm',
};

export function SegmentPicker({ value, onChange, children, className, disabled, size = 'small' }: SegmentPickerProps) {
  const items = React.Children.toArray(children)
    .filter(React.isValidElement)
    .filter((element) => element.type === SegmentPickerItem) as Array<React.ReactElement<SegmentPickerItemProps>>;

  return (
    <div className={clsx('inline-flex items-center rounded-md border border-input', containerSizeClass[size], className)}>
      {items.map((item) => {
        const selected = item.props.value === value;
        return (
          <button
            key={item.props.value}
            type="button"
            disabled={disabled || item.props.disabled}
            className={clsx(
              'rounded-sm',
              itemSizeClass[size],
              selected ? 'bg-muted' : 'bg-transparent',
              'disabled:opacity-50',
            )}
              onClick={(event_) => onChange(event_, item.props.value)}
          >
            {item.props.children}
          </button>
        );
      })}
    </div>
  );
}

SegmentPicker.Item = SegmentPickerItem;
