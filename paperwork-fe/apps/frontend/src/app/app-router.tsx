import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from './router/router-context';
import { WorkflowCollectionPage } from './features/workflow-collection';
import { WorkflowStorageAPI } from './features/workflow-collection/api/workflow-storage';
import { getStoreDataForIntegration, setStoreDataFromIntegration } from './store/slices/diagram-slice/actions';
import useStore from './store/store';

interface AppRouterProps {
  children: React.ReactNode;
}

export function AppRouter({ children }: AppRouterProps) {
  const { currentRoute, navigate, workflowId } = useRouter();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);

  // Track changes in the editor
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);

  useEffect(() => {
    // Simple change detection - in production you'd want more sophisticated tracking
    if (nodes.length > 0 || edges.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges]);

  const persistCurrentWorkflow = useCallback(async () => {
    const currentData = getStoreDataForIntegration();
    const saved = await WorkflowStorageAPI.saveFromEditor(currentData, activeWorkflowId);
    setActiveWorkflowId(saved.id);
    setHasUnsavedChanges(false);
    return saved;
  }, [activeWorkflowId]);

  const handleWorkflowSelect = useCallback(async (selectedWorkflowId: string) => {
    // Check for unsaved changes
    if (hasUnsavedChanges && currentRoute === '/') {
      const confirmed = globalThis.confirm(
        'You have unsaved changes. Do you want to save before switching workflows?'
      );
      
      if (confirmed) {
        await persistCurrentWorkflow();
      }
    }

    // Load selected workflow
    const workflow = await WorkflowStorageAPI.getById(selectedWorkflowId);
    if (workflow) {
      setStoreDataFromIntegration(workflow.data);
      setActiveWorkflowId(workflow.id);
      setHasUnsavedChanges(false);
      navigate('/');
    }
  }, [hasUnsavedChanges, currentRoute, navigate, persistCurrentWorkflow]);

  const handleCreateNew = useCallback(() => {
    // Check for unsaved changes
    if (hasUnsavedChanges && currentRoute === '/') {
      const confirmed = globalThis.confirm(
        'You have unsaved changes. Do you want to save before creating a new workflow?'
      );
      
      if (confirmed) {
        persistCurrentWorkflow();
      }
    }

    // Clear editor for new workflow
    useStore.getState().setDiagramModel();
    setActiveWorkflowId(null);
    setHasUnsavedChanges(false);
    navigate('/');
  }, [hasUnsavedChanges, currentRoute, navigate, persistCurrentWorkflow]);

  const handleNavigateToCollection = useCallback(() => {
    // Check for unsaved changes
    if (hasUnsavedChanges) {
      const confirmed = globalThis.confirm(
        'You have unsaved changes. Do you want to save before leaving?'
      );
      
      if (confirmed) {
        persistCurrentWorkflow();
      }
    }

    setHasUnsavedChanges(false);
    navigate('/workflows');
  }, [hasUnsavedChanges, navigate, persistCurrentWorkflow]);

  // Expose navigation function to child components
  useEffect(() => {
    // Store navigation function in a global context or similar
    globalThis.__navigateToCollection = handleNavigateToCollection;
    globalThis.__persistWorkflowToCollection = persistCurrentWorkflow;
    
    return () => {
      globalThis.__navigateToCollection = undefined;
      globalThis.__persistWorkflowToCollection = undefined;
    };
  }, [handleNavigateToCollection, persistCurrentWorkflow]);

  // If someone lands directly on /workflows/:id, load it into the editor.
  useEffect(() => {
    if (!workflowId) return;

    (async () => {
      const workflow = await WorkflowStorageAPI.getById(workflowId);
      if (!workflow) return;

      setStoreDataFromIntegration(workflow.data);
      setActiveWorkflowId(workflow.id);
      setHasUnsavedChanges(false);
      navigate('/');
    })();
  }, [workflowId, navigate]);

  if (currentRoute === '/workflows') {
    return (
      <WorkflowCollectionPage
        onWorkflowSelect={handleWorkflowSelect}
        onCreateNew={handleCreateNew}
      />
    );
  }

  // Default route: workflow editor
  return <>{children}</>;
}
