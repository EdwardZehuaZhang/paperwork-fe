import { Workflow } from '../types';
import { IntegrationDataFormat } from '@/features/integration/types';
import { sampleWorkflowStudentLedCommissionProjectAgreement } from './sample-workflows/sample_1.student-led';

const STORAGE_KEY = 'paperwork_workflows';

/**
 * Mock API service for workflow storage
 * In production, this would communicate with a real backend API
 */
export class WorkflowStorageAPI {
  /**
   * Get all workflows from storage
   */
  static async getAll(): Promise<Workflow[]> {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return this.getSampleWorkflows();

    try {
      const workflows = JSON.parse(stored);
      // Convert date strings back to Date objects
      return (workflows as unknown[]).map((w) => {
        const workflow = w as Record<string, unknown>;

        return {
          ...workflow,
          dateModified: new Date(String(workflow.dateModified)),
          dateCreated: new Date(String(workflow.dateCreated)),
        } as Workflow;
      });
    } catch (error) {
      console.error('Error parsing workflows:', error);
      return this.getSampleWorkflows();
    }
  }

  /**
   * Get a single workflow by ID
   */
  static async getById(id: string): Promise<Workflow | null> {
    const workflows = await this.getAll();
    return workflows.find(w => w.id === id) || null;
  }

  /**
   * Save a new workflow or update existing one
   */
  static async save(workflow: Workflow): Promise<Workflow> {
    const workflows = await this.getAll();
    const existingIndex = workflows.findIndex(w => w.id === workflow.id);
    
    const savedWorkflow = {
      ...workflow,
      dateModified: new Date(),
    };

    if (existingIndex !== -1) {
      workflows[existingIndex] = savedWorkflow;
    } else {
      workflows.push(savedWorkflow);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
    return savedWorkflow;
  }

  /**
   * Save the current editor state to an existing workflow (if provided), otherwise create a new one.
   *
   * This prevents duplicates when you "save" an already-saved workflow.
   */
  static async saveFromEditor(data: IntegrationDataFormat, workflowId?: string | null): Promise<Workflow> {
    const existing = workflowId ? await this.getById(workflowId) : null;

    if (existing) {
      const updated: Workflow = {
        ...existing,
        name: data.name || existing.name || 'Untitled Workflow',
        nodeCount: data.nodes.length,
        dateModified: new Date(),
        data,
      };

      return this.save(updated);
    }

    const newWorkflow: Workflow = {
      id: this.generateId(),
      name: data.name || 'Untitled Workflow',
      dateModified: new Date(),
      dateCreated: new Date(),
      nodeCount: data.nodes.length,
      thumbnailIcon: this.getRandomIcon(),
      category: 'General',
      tags: [],
      data,
    };

    return this.save(newWorkflow);
  }

  /**
   * Create a new workflow from current editor state
   */
  static async create(data: IntegrationDataFormat): Promise<Workflow> {
    return this.saveFromEditor(data, null);
  }

  /**
   * Delete a workflow by ID
   */
  static async delete(id: string): Promise<void> {
    const workflows = await this.getAll();
    const filtered = workflows.filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  /**
   * Duplicate a workflow
   */
  static async duplicate(id: string): Promise<Workflow | null> {
    const original = await this.getById(id);
    if (!original) return null;

    const duplicate: Workflow = {
      ...original,
      id: this.generateId(),
      name: `${original.name} (Copy)`,
      dateCreated: new Date(),
      dateModified: new Date(),
    };

    return this.save(duplicate);
  }

  /**
   * Rename a workflow
   */
  static async rename(id: string, newName: string): Promise<Workflow | null> {
    const workflow = await this.getById(id);
    if (!workflow) return null;

    workflow.name = newName;
    workflow.dateModified = new Date();
    return this.save(workflow);
  }

  /**
   * Generate a unique ID
   */
  private static generateId(): string {
    return `workflow_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }

  /**
   * Get a random icon for workflow thumbnails
   */
  private static getRandomIcon(): string {
    const icons = ['Workflow', 'FileText', 'Briefcase', 'Clipboard', 'FolderOpen', 'Database'];
    return icons[Math.floor(Math.random() * icons.length)];
  }

  /**
   * Get sample workflows for initial state
   */
  private static getSampleWorkflows(): Workflow[] {
    return [
      {
        id: 'sample_1',
        name: 'Student-Led Commission Project Agreement',
        dateModified: new Date(2025, 11, 10),
        dateCreated: new Date(2025, 10, 15),
        nodeCount: sampleWorkflowStudentLedCommissionProjectAgreement.nodes.length,
        thumbnailIcon: 'Briefcase',
        category: 'Legal',
        tags: ['agreement', 'commission', 'form'],
        data: {
          ...sampleWorkflowStudentLedCommissionProjectAgreement,
        },
      },
      {
        id: 'sample_2',
        name: 'Expense Claim Process',
        dateModified: new Date(2025, 11, 8),
        dateCreated: new Date(2025, 9, 20),
        nodeCount: 12,
        thumbnailIcon: 'FileText',
        category: 'Finance',
        tags: ['expense', 'claims', 'finance'],
        data: {
          name: 'Expense Claim Process',
          nodes: [],
          edges: [],
          layoutDirection: 'RIGHT',
        },
      },
      {
        id: 'sample_3',
        name: 'Leave Application',
        dateModified: new Date(2025, 11, 5),
        dateCreated: new Date(2025, 8, 10),
        nodeCount: 6,
        thumbnailIcon: 'Clipboard',
        category: 'HR',
        tags: ['leave', 'hr', 'approval'],
        data: {
          name: 'Leave Application',
          nodes: [],
          edges: [],
          layoutDirection: 'RIGHT',
        },
      },
      {
        id: 'sample_4',
        name: 'Purchase Order Approval',
        dateModified: new Date(2025, 11, 3),
        dateCreated: new Date(2025, 7, 5),
        nodeCount: 10,
        thumbnailIcon: 'Database',
        category: 'Procurement',
        tags: ['purchase', 'approval', 'procurement'],
        data: {
          name: 'Purchase Order Approval',
          nodes: [],
          edges: [],
          layoutDirection: 'RIGHT',
        },
      },
      {
        id: 'sample_5',
        name: 'Invoice Processing',
        dateModified: new Date(2025, 10, 28),
        dateCreated: new Date(2025, 6, 15),
        nodeCount: 9,
        thumbnailIcon: 'FileText',
        category: 'Finance',
        tags: ['invoice', 'finance', 'processing'],
        data: {
          name: 'Invoice Processing',
          nodes: [],
          edges: [],
          layoutDirection: 'RIGHT',
        },
      },
      {
        id: 'sample_6',
        name: 'Contract Review',
        dateModified: new Date(2025, 10, 25),
        dateCreated: new Date(2025, 5, 20),
        nodeCount: 7,
        thumbnailIcon: 'FolderOpen',
        category: 'Legal',
        tags: ['contract', 'legal', 'review'],
        data: {
          name: 'Contract Review',
          nodes: [],
          edges: [],
          layoutDirection: 'RIGHT',
        },
      },
    ];
  }
}
