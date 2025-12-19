import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkflowCollectionPage } from '../features/workflow-collection';

export function WorkflowsCatalogPage() {
  const navigate = useNavigate();

  const onWorkflowSelect = useCallback(
    async (workflowId: string) => {
      navigate(`/workflows/${workflowId}`);
    },
    [navigate],
  );

  const onCreateNew = useCallback(() => {
    navigate('/workflows/new');
  }, [navigate]);

  return <WorkflowCollectionPage onWorkflowSelect={onWorkflowSelect} onCreateNew={onCreateNew} />;
}
