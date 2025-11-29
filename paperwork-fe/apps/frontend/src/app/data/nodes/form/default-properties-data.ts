import { NodeDataProperties } from '@/features/json-form/types/default-properties';
import { FormNodeSchema } from './schema';

export const defaultPropertiesData: NodeDataProperties<FormNodeSchema> = {
  label: 'Form',
  description: 'Perform actions based on triggers',
  type: 'form',
  status: 'active',
  formBody: {
    question1: 'Question 1',
    question2: 'Question 2',
    signature: 'yes',
  },
};
