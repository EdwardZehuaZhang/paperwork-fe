import type { IntegrationDataFormat } from '@/features/integration/types';

export type RequestStatus = 'in_progress' | 'completed' | 'rejected';

export type RequestNodeCompletion = {
  completedAt: string; // ISO
  data: unknown;
};

export type RequestNodeApproval = {
  approved: boolean;
  decidedBy?: string;
  decidedAt?: string; // ISO
  rejectionNotes?: string;
};

export type RequestNodeData = {
  completions: Record<string, RequestNodeCompletion>; // userId -> completion
  approval?: RequestNodeApproval;
};

export type RequestInstance = {
  id: string;

  templateWorkflowId: string;
  templateName: string;
  templateSnapshot: IntegrationDataFormat;

  createdByUserId: string;

  status: RequestStatus;
  currentNodeIds: string[];
  completedNodeIds: string[];

  nodeData: Record<string, RequestNodeData>; // nodeId -> data

  createdAt: string; // ISO
  updatedAt: string; // ISO
};
