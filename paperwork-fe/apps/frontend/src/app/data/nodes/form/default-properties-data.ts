import { NodeDataProperties } from '@/features/json-form/types/default-properties';
import { FormNodeSchema } from './schema';

export const defaultPropertiesData: NodeDataProperties<FormNodeSchema> = {
  label: 'Form',
  description: 'Perform actions based on triggers',
  type: 'form',
  status: 'active',
  formBody: {
    time: '',
    time1: 'Date, Month and Year',
    currentTime1: '',
    address1: '',
    question1: '',
    signature1: '',
  },
};
