import { BaseControlProps } from '../types/controls';
import { IndicatorDot } from '../components/indicator-dot/indicator-dot';
import {
  ShadcnField,
  ShadcnFieldLabel,
  ShadcnFieldDescription,
  ShadcnFieldError,
} from '@synergycodes/overflow-ui';

type Props = BaseControlProps & {
  children: React.ReactNode;
  description?: string;
};

export function ControlWrapper({ children, uischema, errors = '', description, ...props }: Props) {
  const { required, visible } = props;
  const { label, errorIndicatorEnabled = true } = uischema;

  if (!visible) {
    return;
  }

  const hasLabel = typeof label === 'string';
  const hasErrors = Boolean(errors);
  const showIndicatorDot = hasErrors && errorIndicatorEnabled;
  const childrenControl = showIndicatorDot ? <IndicatorDot>{children}</IndicatorDot> : children;
  const errorMessages = errors ? [{ message: errors }] : [];

  // Generate a unique ID for the field
  const fieldId = `field-${uischema.scope?.replace(/[^a-zA-Z0-9]/g, '-') || 'control'}`;

  return (
    <>
      {hasLabel ? (
        <ShadcnField data-invalid={hasErrors || undefined}>
          <ShadcnFieldLabel htmlFor={fieldId}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </ShadcnFieldLabel>
          <div id={fieldId}>{childrenControl}</div>
          {description && <ShadcnFieldDescription>{description}</ShadcnFieldDescription>}
          {hasErrors && <ShadcnFieldError errors={errorMessages} />}
        </ShadcnField>
      ) : (
        <>{childrenControl}</>
      )}
    </>
  );
}
