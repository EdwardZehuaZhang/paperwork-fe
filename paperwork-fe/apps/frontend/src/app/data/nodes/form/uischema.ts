import { UISchema } from '@/features/json-form/types/uischema';
import { getScope } from '@/features/json-form/utils/get-scope';
import { FormNodeSchema, signatureOptions } from './schema';
import { generalInformation } from '../shared/general-information';

const scope = getScope<FormNodeSchema>;

const formBodySection: UISchema = {
  type: 'Accordion',
  label: 'Form Body',
  elements: [
    {
      type: 'Text',
      scope: scope('properties.formBody.properties.question1'),
      label: 'Question 1',
      placeholder: 'Type your question here...',
    },
    {
      type: 'Text',
      scope: scope('properties.formBody.properties.question2'),
      label: 'Question 2',
      placeholder: 'Type your question here...',
    },
    {
      type: 'Select',
      scope: scope('properties.formBody.properties.signature'),
      label: 'Signature',
      options: signatureOptions,
    },
  ],
};

export const uischema: UISchema = {
  type: 'VerticalLayout',
  elements: [
    ...(generalInformation ? [generalInformation] : []),
    formBodySection,
  ],
};
