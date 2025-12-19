import { NodeDataProperties } from '@/features/json-form/types/default-properties';
import { ApprovaNodeSchema } from './schema';

export const defaultPropertiesData: NodeDataProperties<ApprovaNodeSchema> = {
  label: 'Approva',
  description: 'Approve an existing form or sheet',
  type: 'approva',
  status: 'active',
  linkedNodeId: '',
  noteRequirement: 'optional',
  notePlaceholder: 'Additional note',
  formBody: {
    time1: 'Date, Month and Year',
    question1: '',
    signature1: '',
  },
};
