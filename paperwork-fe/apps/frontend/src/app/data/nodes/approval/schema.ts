import { sharedProperties } from '../shared/shared-properties';
import { statusOptions } from '../shared/general-information';
import { NodeSchema } from '@workflow-builder/types/node-schema';

export const schema = {
  required: ['label', 'description', 'status', 'type'],
  type: 'object',
  properties: {
    ...sharedProperties,
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
      options: Object.values(statusOptions),
    },
    linkedNodeId: {
      type: 'string',
    },
    noteRequirement: {
      type: 'string',
      options: ['optional', 'required'],
    },
    notePlaceholder: {
      type: 'string',
    },
    formBody: {
      type: 'object',
      properties: {
        time1: { type: 'string' },
        question1: { type: 'string' },
        signature1: { type: 'string' },
      },
    },
  },
} satisfies NodeSchema;

export type ApprovalNodeSchema = typeof schema;
