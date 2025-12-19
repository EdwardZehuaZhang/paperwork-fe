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

import styles from './workflow-node-template.module.css';
import { withOptionalComponentPlugins } from '@/features/plugins-core/adapters/adapter-components';
import { NodeData } from '@workflow-builder/types/node-data';
import useStore from '@/store/store';
import { extractContentFromNodeData } from '../components/block-note-editor/extract-questions';
import { FormPreview } from '../components/form-preview/form-preview';
import { SheetEditor } from '../components/sheet-editor/sheet-editor';
import { SheetPreview } from '../components/sheet-preview/sheet-preview';
import { ApprovalFormPreview } from '../components/approval-form-preview/approval-form-preview';

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
    const nodes = useStore((store) => store.nodes);

    const iconElement = useMemo(() => <Icon name={icon} size="large" />, [icon]);

    const hasContent = !!children;

    const isApprovalNode = data?.type === 'approval';
    const linkedNodeId = isApprovalNode ? (data?.properties as any)?.linkedNodeId : undefined;
    const linkedNode = linkedNodeId ? nodes.find((node) => node.id === linkedNodeId) : undefined;

    const isFormApprovalNode = isApprovalNode && linkedNode?.data?.type === 'form';
    const isStandaloneSheetNode = data?.type === 'sheet';
    const allowEditDocumentPreviewForm = isStandaloneSheetNode || isFormApprovalNode;

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

    const handleSheetChange = useCallback(
      (content: unknown) => {
        setNodeData(id, { sheetContent: content });
      },
      [id, setNodeData],
    );

    const handlePreviewModeChange = useCallback(
      (value: string) => {
        if (!allowEditDocumentPreviewForm) {
          return;
        }

        if (value) {
          setNodeData(id, { previewMode: value as 'editDocument' | 'previewForm' });
        }
      },
      [allowEditDocumentPreviewForm, id, setNodeData],
    );

    // Extract questions, signatures, and times from node data for content placeholders
    const effectiveLinkedProperties = useMemo(() => {
      if (!isApprovalNode) return undefined;
      const linkedProperties = (linkedNode?.data?.properties as Record<string, unknown>) || undefined;
      return linkedProperties;
    }, [isApprovalNode, linkedNode?.data?.properties]);

    const effectiveFormBody = useMemo(() => {
      const localFormBody = ((data?.properties as any)?.formBody || {}) as Record<string, unknown>;
      const linkedFormBody = (effectiveLinkedProperties as any)?.formBody || {};
      return {
        ...(isApprovalNode ? linkedFormBody : {}),
        ...localFormBody,
      };
    }, [data?.properties, effectiveLinkedProperties, isApprovalNode]);

    const contentExtractionData = useMemo(() => {
      if (!isApprovalNode || !data) return data;
      return {
        ...data,
        properties: {
          ...(effectiveLinkedProperties || {}),
          ...(data.properties as Record<string, unknown>),
          formBody: effectiveFormBody,
        },
      } as NodeData;
    }, [data, effectiveFormBody, effectiveLinkedProperties, isApprovalNode]);

    const { questions, signatures, times } = useMemo(
      () => extractContentFromNodeData(contentExtractionData),
      [contentExtractionData],
    );

    const previewMode = allowEditDocumentPreviewForm
      ? (data?.previewMode || 'editDocument')
      : 'editDocument';
    const noteRequirement = ((data?.properties as any)?.noteRequirement as 'optional' | 'required') || 'optional';
    const notePlaceholder = ((data?.properties as any)?.notePlaceholder as string) || 'Additional note';
    const isSheetNode = data?.type === 'sheet' || (isApprovalNode && linkedNode?.data?.type === 'sheet');

    const expandedDocumentOrientation = isSheetNode ? 'landscape' : 'portrait';
    const expandedWidth = expandedDocumentOrientation === 'landscape' ? '1272px' : '900px';
    const expandedDocumentAspectRatio =
      expandedDocumentOrientation === 'landscape' ? '1.414 / 1' : '1 / 1.414';
    
    // Initialize default sheetContent if missing for sheet nodes
    const sheetContent = useMemo(() => {
      if (!isSheetNode) return undefined;

      if (data?.sheetContent) return data.sheetContent;
      if (isApprovalNode && linkedNode?.data?.sheetContent) return linkedNode.data.sheetContent;

      const toColumnLetter = (index: number): string => {
        let n = index;
        let result = '';
        while (n >= 0) {
          result = String.fromCharCode((n % 26) + 65) + result;
          n = Math.floor(n / 26) - 1;
        }
        return result;
      };

      const columnDefs = [];
      for (let i = 0; i < 10; i++) {
        columnDefs.push({
          field: `col${i + 1}`,
          headerName: toColumnLetter(i),
          width: 150,
        });
      }

      const rowData = [];
      for (let i = 0; i < 30; i++) {
        const row: Record<string, string> = {};
        for (let j = 0; j < 10; j++) {
          row[`col${j + 1}`] = '';
        }
        rowData.push(row);
      }

      return {
        columnDefs,
        rowData,
        cellFormatting: {},
      };
    }, [data?.sheetContent, isApprovalNode, isSheetNode, linkedNode?.data?.sheetContent]);

    const effectiveEditorContent = useMemo(() => {
      if (data?.editorContent) return data.editorContent;
      if (isApprovalNode && linkedNode?.data?.editorContent) return linkedNode.data.editorContent;
      return undefined;
    }, [data?.editorContent, isApprovalNode, linkedNode?.data?.editorContent]);

    const showNodeContent = isExpanded || hasContent;

    return (
      <Collapsible>
        <div
          className={styles['content']}
          data-expanded={isExpanded ? 'true' : 'false'}
          style={
            {
              '--workflow-node-expanded-width': expandedWidth,
              '--workflow-node-document-aspect-ratio': expandedDocumentAspectRatio,
            } as React.CSSProperties
          }
        >
          <div className={styles['header']}>
            <NodeIcon icon={iconElement} />
            <NodeDescription label={label} description={description} />
            {selected && allowEditDocumentPreviewForm && (
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
                        isSheetNode ? (
                          <SheetEditor
                            nodeId={id}
                            initialContent={sheetContent}
                            onChange={handleSheetChange}
                            selected={selected}
                            questions={questions}
                            signatures={signatures}
                            times={times}
                          />
                        ) : (
                          <Suspense
                            fallback={
                              <div className={styles['editor-loading']}>
                                <span className="ax-public-p11">Loading editor...</span>
                              </div>
                            }
                          >
                            <BlockNoteEditor
                              nodeId={id}
                              initialContent={effectiveEditorContent}
                              onChange={handleEditorChange}
                              selected={selected}
                              questions={questions}
                              signatures={signatures}
                              times={times}
                            />
                          </Suspense>
                        )
                      ) : isApprovalNode ? (
                        <ApprovalFormPreview
                          formBody={effectiveFormBody}
                          noteRequirement={noteRequirement}
                          notePlaceholder={notePlaceholder}
                        />
                      ) : (
                        <FormPreview formBody={effectiveFormBody} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Collapsible>
    );
  },
);

export const WorkflowNodeTemplate = withOptionalComponentPlugins(WorkflowNodeTemplateComponent, 'WorkflowNodeTemplate');
