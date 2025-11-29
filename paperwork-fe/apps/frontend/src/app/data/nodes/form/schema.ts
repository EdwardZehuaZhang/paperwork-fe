import { sharedProperties } from '../shared/shared-properties';
import { statusOptions } from '../shared/general-information';
import { NodeSchema } from '@workflow-builder/types/node-schema';

export const signatureOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;

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
    formBody: {
      type: 'object',
      properties: {
        question1: { type: 'string' },
        question2: { type: 'string' },
        signature: {
          type: 'string',
          options: Object.values(signatureOptions),
        },
      },
    },
  },
} satisfies NodeSchema;

export type FormNodeSchema = typeof schema;
