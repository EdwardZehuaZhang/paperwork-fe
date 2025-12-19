import { UISchema } from '@/features/json-form/types/uischema';
import { getScope } from '@/features/json-form/utils/get-scope';
import { generalInformation } from '../shared/general-information';
import { ApprovaNodeSchema } from './schema';

const scope = getScope<ApprovaNodeSchema>;

const linkSection: UISchema = {
  type: 'Group',
  label: 'Link',
  elements: [
    {
      type: 'LinkedNodeSelect',
      scope: scope('properties.linkedNodeId'),
      label: 'Linked node',
      options: {
        placeholder: 'Search form or sheet nodes',
      },
    },
  ],
};

const approvalOptionsSection: UISchema = {
  type: 'Group',
  label: 'Approval options',
  elements: [
    {
      type: 'Select',
      scope: scope('properties.noteRequirement'),
      label: 'Note requirement',
      options: {
        placeholder: 'Select requirement',
      },
    },
    {
      type: 'Text',
      scope: scope('properties.notePlaceholder'),
      label: 'Note placeholder',
      options: {
        placeholder: 'Additional note',
      },
    },
  ],
};

const formBodySection: UISchema = {
  type: 'FormBody',
  scope: scope('properties.formBody'),
  label: 'Content',
};

export const uischema: UISchema = {
  type: 'VerticalLayout',
  elements: [
    ...(generalInformation ? [generalInformation] : []),
    linkSection,
    approvalOptionsSection,
    formBodySection,
  ],
};
