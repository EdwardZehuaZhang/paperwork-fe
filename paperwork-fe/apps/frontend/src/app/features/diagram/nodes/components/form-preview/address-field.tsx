import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface AddressFieldProps {
  label: string;
  questionKey: string;
  format: string;
}

function shouldShowCity(format: string) {
  return format === 'Street Address and City' || format === 'Street Address, City and Postal Code';
}

function shouldShowPostalCode(format: string) {
  return format === 'Street Address, City and Postal Code';
}

export function AddressField({ label, questionKey, format }: AddressFieldProps) {
  const showCity = shouldShowCity(format);
  const showPostalCode = shouldShowPostalCode(format);

  return (
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      <FieldDescription>We need your address to deliver your order.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`${questionKey}-street`}>Street Address</FieldLabel>
          <Input id={`${questionKey}-street`} type="text" placeholder="123 Main St" />
        </Field>

        {(showCity || showPostalCode) && (
          <div className={showCity && showPostalCode ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1 gap-4'}>
            {showCity && (
              <Field>
                <FieldLabel htmlFor={`${questionKey}-city`}>City</FieldLabel>
                <Input id={`${questionKey}-city`} type="text" placeholder="New York" />
              </Field>
            )}
            {showPostalCode && (
              <Field>
                <FieldLabel htmlFor={`${questionKey}-zip`}>Postal Code</FieldLabel>
                <Input id={`${questionKey}-zip`} type="text" placeholder="90502" />
              </Field>
            )}
          </div>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
