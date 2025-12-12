import { JsonFormsRendererRegistryEntry, LabelProps } from '@jsonforms/core';
import { LabelElement } from '../../types/label';
import { withJsonFormsLabelProps } from '@jsonforms/react';
import { createTester } from '../../utils/rendering';
import { ShadcnFieldLabel } from '@synergycodes/overflow-ui';

function LabelRendererComponent({ uischema }: LabelProps) {
  const { text, required } = uischema as LabelElement;

  return (
    <ShadcnFieldLabel>
      {text}
      {required && <span className="text-destructive ml-1">*</span>}
    </ShadcnFieldLabel>
  );
}

export const labelRenderer: JsonFormsRendererRegistryEntry = {
  renderer: withJsonFormsLabelProps(LabelRendererComponent),
  tester: createTester('Label'),
};
