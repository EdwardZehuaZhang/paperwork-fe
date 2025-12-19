import type { RequestInstance } from '../../types/requests';
import { RequestStorageLocal } from './request-storage-local';

/**
 * Request storage facade.
 * For the demo, this uses localStorage. Later we can switch to API.
 */
export class RequestStorageAPI {
  static async getAll(): Promise<RequestInstance[]> {
    return RequestStorageLocal.getAll();
  }

  static async getById(id: string): Promise<RequestInstance | null> {
    return RequestStorageLocal.getById(id);
  }

  static async createFromTemplate(templateWorkflowId: string, createdByUserId: string): Promise<RequestInstance> {
    return RequestStorageLocal.createFromTemplate(templateWorkflowId, createdByUserId);
  }

  static async save(instance: RequestInstance): Promise<RequestInstance> {
    return RequestStorageLocal.save(instance);
  }
}
