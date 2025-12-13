import { BaseControlProps } from '../types/controls';
import { IndicatorDot } from '../components/indicator-dot/indicator-dot';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/components/ui/field';

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
        <Field data-invalid={hasErrors || undefined}>
          <FieldLabel htmlFor={fieldId}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>
          <div id={fieldId}>{childrenControl}</div>
          {description && <FieldDescription>{description}</FieldDescription>}
          {hasErrors && <FieldError errors={errorMessages} />}
        </Field>
      ) : (
        <>{childrenControl}</>
      )}
    </>
  );
}
