import type { IntegrationDataFormat } from '@/features/integration/types';
import type { RequestInstance, RequestNodeData } from '../../types/requests';

export type ApprovalDecision = {
  approved: boolean;
  rejectionNotes?: string;
};

function nowIso() {
  return new Date().toISOString();
}

function ensureNodeData(nodeData: Record<string, RequestNodeData>, nodeId: string): RequestNodeData {
  return (nodeData[nodeId] ??= { completions: {} });
}

function getIncomingSourceIds(model: IntegrationDataFormat, nodeId: string): string[] {
  return model.edges
    .filter((e) => (e as { target?: string }).target === nodeId)
    .map((e) => (e as { source?: string }).source)
    .filter((v): v is string => typeof v === 'string');
}

function getOutgoingTargetIds(model: IntegrationDataFormat, nodeId: string): string[] {
  return model.edges
    .filter((e) => (e as { source?: string }).source === nodeId)
    .map((e) => (e as { target?: string }).target)
    .filter((v): v is string => typeof v === 'string');
}

export function completeNode(args: {
  request: RequestInstance;
  nodeId: string;
  userId: string;
  data: unknown;
  decision?: ApprovalDecision;
}): RequestInstance {
  const { request, nodeId, userId, data, decision } = args;
  const snapshot: IntegrationDataFormat = request.templateSnapshot;

  const next: RequestInstance = {
    ...request,
    nodeData: { ...request.nodeData },
    currentNodeIds: [...request.currentNodeIds],
    completedNodeIds: [...request.completedNodeIds],
    updatedAt: nowIso(),
  };

  const node = ensureNodeData(next.nodeData, nodeId);
  node.completions = { ...node.completions, [userId]: { completedAt: nowIso(), data } };

  if (!next.completedNodeIds.includes(nodeId)) {
    next.completedNodeIds.push(nodeId);
  }

  // Remove this node from current set
  next.currentNodeIds = next.currentNodeIds.filter((id) => id !== nodeId);

  if (decision) {
    node.approval = {
      approved: decision.approved,
      decidedBy: userId,
      decidedAt: nowIso(),
      rejectionNotes: decision.rejectionNotes,
    };

    if (!decision.approved) {
      // MVP: return to previous node (first incoming edge)
      const incoming = getIncomingSourceIds(snapshot, nodeId);
      const previous = incoming[0];
      if (previous) next.currentNodeIds = [previous];
      return next;
    }
  }

  // Advance to next nodes (supports parallel by allowing multiple outgoing edges)
  const outgoing = getOutgoingTargetIds(snapshot, nodeId);
  if (outgoing.length > 0) {
    next.currentNodeIds = [...new Set([...next.currentNodeIds, ...outgoing])];
    return next;
  }

  // No outgoing edges → consider request completed
  next.status = 'completed';
  return next;
}
