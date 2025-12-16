import * as React from 'react';
import clsx from 'clsx';

export type IconSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  /** Legacy props */
  icon?: React.ReactNode;
  IconChecked?: React.ReactNode;
  variant?: string;
  /** Preferred props */
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  'aria-label'?: string;
};

export function IconSwitch({
  checked,
  onChange,
  disabled,
  className,
  iconOn,
  iconOff,
  icon,
  IconChecked,
  ...props
}: IconSwitchProps) {
  const resolvedIconOff = iconOff ?? icon;
  const resolvedIconOn = iconOn ?? IconChecked;

  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx('inline-flex items-center justify-center rounded-md border border-input p-2', className)}
      onClick={() => onChange(!checked)}
      {...props}
    >
      {checked ? resolvedIconOn : resolvedIconOff}
    </button>
  );
}
