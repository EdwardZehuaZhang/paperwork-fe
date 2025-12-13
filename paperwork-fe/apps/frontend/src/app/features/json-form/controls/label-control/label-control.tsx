import { JsonFormsRendererRegistryEntry, LabelProps } from '@jsonforms/core';
import { LabelElement } from '../../types/label';
import { withJsonFormsLabelProps } from '@jsonforms/react';
import { createTester } from '../../utils/rendering';
import { FieldLabel } from '@/components/ui/field';

function LabelRendererComponent({ uischema }: LabelProps) {
  const { text, required } = uischema as LabelElement;

  return (
    <FieldLabel>
      {text}
      {required && <span className="text-destructive ml-1">*</span>}
    </FieldLabel>
  );
}

export const labelRenderer: JsonFormsRendererRegistryEntry = {
  renderer: withJsonFormsLabelProps(LabelRendererComponent),
  tester: createTester('Label'),
};
