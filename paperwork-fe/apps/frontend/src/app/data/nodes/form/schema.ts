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
        // Legacy single time format
        time: { type: 'string' },
        // Preferred numbered time fields
        time1: { type: 'string' },
        // Preferred numbered current time fields
        currentTime1: { type: 'string' },
        // Preferred numbered address fields
        address1: { type: 'string' },
        question1: { type: 'string' },
        // Seed first signature; additional signatures can be added dynamically in UI
        signature1: { type: 'string' },
      },
    },
  },
} satisfies NodeSchema;

export type FormNodeSchema = typeof schema;
