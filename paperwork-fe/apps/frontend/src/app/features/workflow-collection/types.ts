import { IntegrationDataFormat } from '@/features/integration/types';

export interface WorkflowMetadata {
  id: string;
  name: string;
  dateModified: Date;
  dateCreated: Date;
  nodeCount: number;
  thumbnailIcon: string;
  category?: string;
  tags?: string[];
}

export interface Workflow extends WorkflowMetadata {
  data: IntegrationDataFormat;
}

export type ViewMode = 'grid' | 'list';

export type SortBy = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';
