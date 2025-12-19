import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/app-layout';
import { HomePage } from '../pages/home-page';
import { RequestsListPage } from '../pages/requests-list-page';
import { RequestDetailPage } from '../pages/request-detail-page';
import { WorkflowsCatalogPage } from '../pages/workflows-catalog-page';
import { WorkflowDesignerPage } from '../pages/workflow-designer-page';
import { WorkflowOverviewPage } from '../pages/workflow-overview-page';
import { ApprovalsListPage } from '../pages/approvals-list-page';
import { OrganisationPage } from '../pages/organisation-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'requests', element: <RequestsListPage /> },
      { path: 'requests/:requestId', element: <RequestDetailPage /> },
      { path: 'approvals', element: <ApprovalsListPage /> },
      { path: 'workflows', element: <WorkflowsCatalogPage /> },
      { path: 'workflows/:workflowId', element: <WorkflowDesignerPage /> },
      { path: 'workflows/:workflowId/overview', element: <WorkflowOverviewPage /> },
      { path: 'organisation', element: <OrganisationPage /> },
    ],
  },
]);
