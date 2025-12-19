import { useParams } from 'react-router-dom';

export function RequestDetailPage() {
  const { requestId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Request</h1>
      <p className="mt-2 text-sm text-muted-foreground">Request ID: {requestId}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        (Scaffold) This page will show workflow progress + only the current assigned node interaction.
      </p>
    </div>
  );
}
