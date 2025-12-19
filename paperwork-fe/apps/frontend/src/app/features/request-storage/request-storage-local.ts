import type { IntegrationDataFormat } from '@/features/integration/types';
import type { RequestInstance } from '../../types/requests';
import { WorkflowStorageAPI } from '../workflow-collection/api/workflow-storage';

const STORAGE_KEY = 'paperwork_requests';

function nowIso() {
  return new Date().toISOString();
}

function generateId() {
  return `request_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

function findStartNodeIds(model: IntegrationDataFormat): string[] {
  const nodeIds = model.nodes.map((n) => n.id);
  const incoming = new Map<string, number>();

  for (const id of nodeIds) incoming.set(id, 0);

  for (const edge of model.edges) {
    const target = (edge as { target?: string }).target;
    if (target && incoming.has(target)) incoming.set(target, (incoming.get(target) ?? 0) + 1);
  }

  const starts = nodeIds.filter((id) => (incoming.get(id) ?? 0) === 0);
  return starts.length > 0 ? starts : nodeIds.slice(0, 1);
}

function revive(instance: any): RequestInstance {
  return instance as RequestInstance;
}

export class RequestStorageLocal {
  static async getAll(): Promise<RequestInstance[]> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw) as unknown[];
      return parsed.map(revive);
    } catch {
      return [];
    }
  }

  static async getById(id: string): Promise<RequestInstance | null> {
    const all = await this.getAll();
    return all.find((r) => r.id === id) ?? null;
  }

  static async save(instance: RequestInstance): Promise<RequestInstance> {
    const all = await this.getAll();
    const idx = all.findIndex((r) => r.id === instance.id);
    const next = { ...instance, updatedAt: nowIso() };

    if (idx >= 0) all[idx] = next;
    else all.push(next);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return next;
  }

  static async createFromTemplate(templateWorkflowId: string, createdByUserId: string): Promise<RequestInstance> {
    const workflow = await WorkflowStorageAPI.getById(templateWorkflowId);
    if (!workflow) throw new Error(`Template workflow not found: ${templateWorkflowId}`);

    const templateSnapshot = workflow.data;
    const startNodeIds = findStartNodeIds(templateSnapshot);

    const instance: RequestInstance = {
      id: generateId(),
      templateWorkflowId,
      templateName: workflow.name,
      templateSnapshot,
      createdByUserId,
      status: 'in_progress',
      currentNodeIds: startNodeIds,
      completedNodeIds: [],
      nodeData: {},
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    return this.save(instance);
  }
}
