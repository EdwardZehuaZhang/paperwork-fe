import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type MenuItemProps = {
  type?: 'item';
  label: React.ReactNode;
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  destructive?: boolean;
} | {
  type: 'separator';
  value?: string;
};

export type MenuProps = {
  items: MenuItemProps[];
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  align?: 'start' | 'center' | 'end';
};

export function Menu({ items, children, align = 'end' }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children as React.ReactElement}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {items.map((item, index) => {
          if (item.type === 'separator') {
            return <DropdownMenuSeparator key={`sep-${index}`} />;
          }

          return (
            <DropdownMenuItem
              key={item.value ?? `item-${index}`}
              disabled={item.disabled}
              className={item.destructive ? 'text-destructive focus:text-destructive' : undefined}
              onSelect={(event_) => {
                event_.preventDefault();
                item.onClick?.();
              }}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
