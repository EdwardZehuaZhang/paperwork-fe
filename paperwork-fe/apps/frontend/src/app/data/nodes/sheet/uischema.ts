import { UISchema } from '@/features/json-form/types/uischema';
import { getScope } from '@/features/json-form/utils/get-scope';
import { SheetNodeSchema } from './schema';
import { generalInformation } from '../shared/general-information';

const scope = getScope<SheetNodeSchema>;

const formBodySection: UISchema = {
  type: 'FormBody',
  scope: scope('properties.formBody'),
  label: 'Form Body',
};

export const uischema: UISchema = {
  type: 'VerticalLayout',
  elements: [
    ...(generalInformation ? [generalInformation] : []),
    formBodySection,
  ],
};
