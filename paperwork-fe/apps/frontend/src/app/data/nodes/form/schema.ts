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
    formBody: {
      type: 'object',
      properties: {
        question1: { type: 'string' },
        question2: { type: 'string' },
        // Seed first signature; additional signatures can be added dynamically in UI
        signature1: { type: 'string' },
      },
    },
  },
} satisfies NodeSchema;

export type FormNodeSchema = typeof schema;
