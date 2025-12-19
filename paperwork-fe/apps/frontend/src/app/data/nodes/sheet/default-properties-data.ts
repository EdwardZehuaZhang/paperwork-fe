import { NodeDataProperties } from '@/features/json-form/types/default-properties';
import { SheetNodeSchema } from './schema';

export const defaultPropertiesData: NodeDataProperties<SheetNodeSchema> = {
  label: 'Sheet',
  description: 'Create a editable data grid',
  type: 'sheet',
  status: 'active',
  formBody: {
    time: '',
    time1: 'Date, Month and Year',
    question1: '',
    signature1: '',
  },
};
