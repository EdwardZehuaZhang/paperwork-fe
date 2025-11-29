import { PaletteItem } from '@workflow-builder/types/common';
import { defaultPropertiesData } from './default-properties-data';
import { FormNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const form: PaletteItem<FormNodeSchema> = {
  type: 'form',
  icon: 'Article',
  label: 'Form',
  description: 'Create a form with custom fields',
  defaultPropertiesData,
  schema,
  uischema,
};
