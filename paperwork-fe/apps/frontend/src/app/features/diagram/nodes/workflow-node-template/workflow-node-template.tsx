import { Handle } from '@xyflow/react';
import { IconType, LayoutDirection } from '@workflow-builder/types/common';
import { memo, useMemo, lazy, Suspense, useCallback } from 'react';
import {
  NodeDescription,
  NodeIcon,
  Status,
} from '@/features/diagram/ui-components';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@workflow-builder/icons';
import { getHandleId } from '../../handles/get-handle-id';
import { getHandlePosition } from '../../handles/get-handle-position';

import styles from './workflow-node-template.module.css';
import { withOptionalComponentPlugins } from '@/features/plugins-core/adapters/adapter-components';
import { NodeData } from '@workflow-builder/types/node-data';
import useStore from '@/store/store';
import { extractContentFromNodeData } from '../components/block-note-editor/extract-questions';
import { FormPreview } from '../components/form-preview/form-preview';

// Lazy load BlockNote editor to improve performance
const BlockNoteEditor = lazy(() =>
  import('../components/block-note-editor/block-note-editor').then((module) => ({
    default: module.BlockNoteEditor,
  })),
);

export type WorkflowNodeTemplateProps = {
  id: string;
  icon: IconType;
  label: string;
  description: string;
  data?: NodeData;
  selected?: boolean;
  layoutDirection?: LayoutDirection;
  isConnecting?: boolean;
  showHandles?: boolean;
  isValid?: boolean;
  children?: React.ReactNode;
};

const WorkflowNodeTemplateComponent = memo(
  ({
    id,
    icon,
    label,
    description,
    data,
    layoutDirection = 'RIGHT',
    selected = false,
    showHandles = true,
    isValid,
    children,
  }: WorkflowNodeTemplateProps) => {
    const setNodeData = useStore((store) => store.setNodeData);
    
    const handleTargetId = getHandleId({ nodeId: id, handleType: 'target' });
    const handleSourceId = getHandleId({ nodeId: id, handleType: 'source' });

    const handleTargetPosition = getHandlePosition({ direction: layoutDirection, handleType: 'target' });
    const handleSourcePosition = getHandlePosition({ direction: layoutDirection, handleType: 'source' });

    const iconElement = useMemo(() => <Icon name={icon} size="large" />, [icon]);

    const hasContent = !!children;

    const isFormNode = useMemo(() => {
      const properties = data?.properties as unknown;
      if (!properties || typeof properties !== 'object') {
        return false;
      }

      return (
        'formBody' in properties &&
        typeof (properties as { formBody?: unknown }).formBody === 'object' &&
        (properties as { formBody?: unknown }).formBody !== null
      );
    }, [data?.properties]);

    const isExpanded = selected && isFormNode;

    const handleEditorChange = useCallback(
      (content: unknown) => {
        setNodeData(id, { editorContent: content });
      },
      [id, setNodeData],
    );

    const handlePreviewModeChange = useCallback(
      (value: string) => {
        if (value) {
          setNodeData(id, { previewMode: value as 'editDocument' | 'previewForm' });
        }
      },
      [id, setNodeData],
    );

    // Extract questions, signatures, and times from node data for content placeholders
    const { questions, signatures, times } = useMemo(() => extractContentFromNodeData(data), [data]);

    const previewMode = data?.previewMode || 'editDocument';
    const formBody = (data?.properties as any)?.formBody || {};

    const showNodeContent = isExpanded || hasContent;

    return (
      <Collapsible>
        <div
          className={styles['content']}
          data-expanded={isExpanded ? 'true' : 'false'}
        >
          <div className={styles['header']}>
            <NodeIcon icon={iconElement} />
            <NodeDescription label={label} description={description} />
            {selected && (
              <div style={{ marginLeft: 'auto' }}>
                <Tabs value={previewMode} onValueChange={handlePreviewModeChange}>
                  <TabsList>
                    <TabsTrigger value="editDocument">Edit Document</TabsTrigger>
                    <TabsTrigger value="previewForm">Preview Form</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
            {hasContent && (
              <CollapsibleTrigger asChild>
                <button type="button" aria-label="Toggle details">
                  <Icon name="CaretDown" />
                </button>
              </CollapsibleTrigger>
            )}
          </div>
          {showNodeContent && (
            <div className={styles['node-content']}>
              <Status status={isValid === false ? 'invalid' : undefined} />
              <CollapsibleContent>
                <div className={styles['collapsible']}>{children}</div>
              </CollapsibleContent>
              {isExpanded && (
                <div className={styles['expanded-container']}>
                  <div className={styles['expanded-content']}>
                    <div className={styles['preview-section']}>
                      {previewMode === 'editDocument' ? (
                        <Suspense
                          fallback={
                            <div className={styles['editor-loading']}>
                              <span className="ax-public-p11">Loading editor...</span>
                            </div>
                          }
                        >
                          <BlockNoteEditor
                            nodeId={id}
                            initialContent={data?.editorContent}
                            onChange={handleEditorChange}
                            selected={selected}
                            questions={questions}
                            signatures={signatures}
                            times={times}
                          />
                        </Suspense>
                      ) : (
                        <FormPreview formBody={formBody} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className={styles['handles']} style={{ display: showHandles ? 'flex' : 'none' }}>
            <Handle id={handleTargetId} position={handleTargetPosition} type="target" />
            <Handle id={handleSourceId} position={handleSourcePosition} type="source" />
          </div>
        </div>
      </Collapsible>
    );
  },
);

export const WorkflowNodeTemplate = withOptionalComponentPlugins(WorkflowNodeTemplateComponent, 'WorkflowNodeTemplate');
