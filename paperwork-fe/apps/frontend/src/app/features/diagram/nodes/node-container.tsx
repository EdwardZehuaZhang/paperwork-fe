import useStore from '@/store/store';

import { memo } from 'react';
import { Handle, NodeProps } from '@xyflow/react';
import { WorkflowBuilderNode } from '@workflow-builder/types/node-data';
import { WorkflowNodeTemplate } from './workflow-node-template/workflow-node-template';
import { NodeAsPortWrapper } from '@/features/diagram/ui-components';
import { getHandlePosition } from '../handles/get-handle-position';
import { getIsValidFromProperties } from '@/utils/validation/get-is-valid-from-properties';
import { getHandleId } from '../handles/get-handle-id';

type Props = NodeProps<WorkflowBuilderNode>;

export const NodeContainer = memo(({ id, data, selected }: Props) => {
  const { icon, properties } = data;
  const { label = '', description = '' } = properties;
  const isValid = getIsValidFromProperties(properties);

  const layoutDirection = useStore((store) => store.layoutDirection);
  const handleTargetPosition = getHandlePosition({ direction: layoutDirection, handleType: 'target' });
  const handleSourcePosition = getHandlePosition({ direction: layoutDirection, handleType: 'source' });
  const connectionBeingDragged = useStore((store) => store.connectionBeingDragged);

  const handleTargetId = getHandleId({ nodeId: id, handleType: 'target' });
  const handleSourceId = getHandleId({ nodeId: id, handleType: 'source' });

  return (
    <NodeAsPortWrapper isConnecting={!!connectionBeingDragged} targetPortPosition={handleTargetPosition}>
      <>
        <WorkflowNodeTemplate
          id={id}
          selected={selected}
          layoutDirection={layoutDirection}
          data={data}
          label={label}
          description={description}
          icon={icon}
          isValid={isValid}
          showHandles={false}
        />
        <Handle id={handleTargetId} position={handleTargetPosition} type="target" />
        <Handle id={handleSourceId} position={handleSourcePosition} type="source" />
      </>
    </NodeAsPortWrapper>
  );
});
