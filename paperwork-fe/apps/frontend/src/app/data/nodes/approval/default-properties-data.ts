import { NodeDataProperties } from '@/features/json-form/types/default-properties';
import { ApprovalNodeSchema } from './schema';

export const defaultPropertiesData: NodeDataProperties<ApprovalNodeSchema> = {
  label: 'Approval',
  description: 'Approve an existing form or sheet',
  type: 'approval',
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
