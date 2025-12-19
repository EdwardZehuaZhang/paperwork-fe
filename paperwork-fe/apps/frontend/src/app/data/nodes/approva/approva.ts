import { PaletteItem } from '@workflow-builder/types/common';
import { defaultPropertiesData } from './default-properties-data';
import { ApprovaNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const approva: PaletteItem<ApprovaNodeSchema> = {
  type: 'approva',
  icon: 'Article',
  label: 'Approva',
  description: 'Approval node linked to other',
  defaultPropertiesData,
  schema,
  uischema,
};
