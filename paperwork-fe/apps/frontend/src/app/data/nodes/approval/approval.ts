import { PaletteItem } from '@workflow-builder/types/common';
import { defaultPropertiesData } from './default-properties-data';
import { ApprovalNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const approval: PaletteItem<ApprovalNodeSchema> = {
  type: 'approval',
  icon: 'CheckCircle',
  label: 'Approval',
  description: 'Approval node linked to other',
  defaultPropertiesData,
  schema,
  uischema,
};
