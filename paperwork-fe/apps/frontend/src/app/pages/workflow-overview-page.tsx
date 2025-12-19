import { useParams } from 'react-router-dom';

export function WorkflowOverviewPage() {
  const { workflowId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Workflow Overview</h1>
      <p className="mt-2 text-sm text-muted-foreground">Workflow ID: {workflowId}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        (Scaffold) This will show requests created from this template + stats.
      </p>
    </div>
  );
}
