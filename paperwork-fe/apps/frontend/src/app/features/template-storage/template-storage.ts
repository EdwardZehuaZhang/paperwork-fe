import type { Workflow } from '../workflow-collection/types';
import { WorkflowStorageAPI } from '../workflow-collection/api/workflow-storage';

export type TemplateVisibility = {
  discoverableByDepartments?: string[];
};

/**
 * Thin wrapper around existing workflow storage.
 * For now, a "template" is the same as a stored workflow.
 */
export class TemplateStorageAPI {
  static async getAll(): Promise<Workflow[]> {
    return WorkflowStorageAPI.getAll();
  }

  static async getById(id: string): Promise<Workflow | null> {
    return WorkflowStorageAPI.getById(id);
  }

  static async saveFromEditor(data: Workflow['data'], workflowId?: string | null): Promise<Workflow> {
    return WorkflowStorageAPI.saveFromEditor(data, workflowId);
  }

  // Placeholder for future: store discoverability metadata per template.
  static async getVisibility(_templateId: string): Promise<TemplateVisibility> {
    return {};
  }
}
