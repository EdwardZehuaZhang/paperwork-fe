import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import { setAutoFreeze } from 'immer';

import styles from '../app.module.css';
import { AppBarContainerLazy } from '../features/app-bar/app-bar-container-lazy';
import { PropertiesBarContainerLazy } from '../features/properties-bar/properties-bar-container-lazy';
import { PaletteContainerLazy } from '../features/palette/palette-container-lazy';
import { DiagramWrapper } from '../features/diagram/diagram-wrapper';
import { DiagramContainer as Diagram } from '../features/diagram/diagram';
import { SnackbarContainer } from '../features/snackbar/snackbar-container';
import { OptionalHooks } from '../features/plugins-core/components/optional-hooks';
import { AppLoaderContainer } from '../features/integration/components/app-loader/app-loader-container';

import { WorkflowStorageAPI } from '../features/workflow-collection/api/workflow-storage';
import { setStoreDataFromIntegration } from '../store/slices/diagram-slice/actions';
import useStore from '../store/store';
import { WorkflowDesignerNavigationBridge } from '../routing/workflow-designer-navigation-bridge';

export function WorkflowDesignerPage() {
  const { workflowId } = useParams();
  const [initialWorkflowId, setInitialWorkflowId] = useState<string | null>(null);

  // Disable immer's automatic object freezing because ReactFlow mutates objects under the hood
  setAutoFreeze(false);

  useEffect(() => {
    if (!workflowId) return;

    if (workflowId === 'new') {
      useStore.getState().setDiagramModel();
      setInitialWorkflowId(null);
      return;
    }

    (async () => {
      const workflow = await WorkflowStorageAPI.getById(workflowId);
      if (!workflow) return;

      setStoreDataFromIntegration(workflow.data);
      setInitialWorkflowId(workflow.id);
    })();
  }, [workflowId]);

  return (
    <>
      <WorkflowDesignerNavigationBridge initialWorkflowId={initialWorkflowId} />
      <ReactFlowProvider>
        <div className={styles['container']}>
          <div className={styles['header']}>
            <AppBarContainerLazy />
          </div>
          <div className={styles['content']}>
            <div className={styles['panel']}>
              <PaletteContainerLazy />
            </div>
            <div className={styles['panel']}>
              <div className={styles['right-panel']}>
                <PropertiesBarContainerLazy />
              </div>
            </div>
          </div>
          <DiagramWrapper>
            <Diagram />
          </DiagramWrapper>
          <SnackbarContainer />
          <AppLoaderContainer />
          <OptionalHooks />
        </div>
      </ReactFlowProvider>
    </>
  );
}
