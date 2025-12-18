import * as React from 'react';

export type AccordionProps = {
  label: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Accordion({ label, defaultOpen, children, className }: AccordionProps) {
  return (
    <details className={className} open={defaultOpen}>
      <summary>{label}</summary>
      <div>{children}</div>
    </details>
  );
}
