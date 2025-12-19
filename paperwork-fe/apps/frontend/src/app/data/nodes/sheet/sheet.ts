import { PaletteItem } from '@workflow-builder/types/common';
import { defaultPropertiesData } from './default-properties-data';
import { SheetNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const sheet: PaletteItem<SheetNodeSchema> = {
  type: 'sheet',
  icon: 'Table',
  label: 'Sheet',
  description: 'Create a editable data grid',
  defaultPropertiesData,
  schema,
  uischema,
};
