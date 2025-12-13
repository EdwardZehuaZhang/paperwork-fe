import { useCallback } from 'react';
import { WorkflowStorageAPI } from '../api/workflow-storage';
import { getStoreDataForIntegration } from '@/store/slices/diagram-slice/actions';

/**
 * Hook for managing workflow operations
 */
export function useWorkflowManager() {
  const saveCurrentWorkflow = useCallback(async () => {
    const currentData = getStoreDataForIntegration();
    
    if (!currentData.name) {
      currentData.name = 'Untitled Workflow';
    }

    try {
      const savedWorkflow = await WorkflowStorageAPI.saveFromEditor(currentData, null);
      return savedWorkflow;
    } catch (error) {
      console.error('Error saving workflow:', error);
      throw error;
    }
  }, []);

  return {
    saveCurrentWorkflow,
  };
}
