import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkflowStorageAPI } from '../features/workflow-collection/api/workflow-storage';
import { getStoreDataForIntegration } from '../store/slices/diagram-slice/actions';

export function WorkflowDesignerNavigationBridge({ initialWorkflowId }: { initialWorkflowId: string | null }) {
  const navigate = useNavigate();
  const activeWorkflowIdRef = useRef<string | null>(null);

  useEffect(() => {
    activeWorkflowIdRef.current = initialWorkflowId;
  }, [initialWorkflowId]);

  const persistCurrentWorkflow = useMemo(() => {
    return async () => {
      const currentData = getStoreDataForIntegration();
      const saved = await WorkflowStorageAPI.saveFromEditor(currentData, activeWorkflowIdRef.current);
      activeWorkflowIdRef.current = saved.id;
      return saved;
    };
  }, []);

  useEffect(() => {
    globalThis.__navigateToCollection = () => {
      navigate('/workflows');
    };

    globalThis.__persistWorkflowToCollection = persistCurrentWorkflow;

    return () => {
      globalThis.__navigateToCollection = undefined;
      globalThis.__persistWorkflowToCollection = undefined;
    };
  }, [navigate, persistCurrentWorkflow]);

  return null;
}
