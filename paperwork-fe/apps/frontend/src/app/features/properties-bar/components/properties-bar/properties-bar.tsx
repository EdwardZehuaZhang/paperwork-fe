import styles from './properties-bar.module.css';

import { SegmentPicker } from '@/components/overflow-ui';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { withOptionalComponentPlugins } from '@/features/plugins-core/adapters/adapter-components';
import { EdgeProperties } from '../edge-properties/edge-properties';
import { PropertiesBarHeader } from '../header/properties-bar-header';
import { NodeProperties } from '../node-properties/node-properties';
import { renderComponent } from './render-component';
import { PropertiesBarItem, PropertiesBarProps } from './properties-bar.types';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * PropertiesBarComponent - A configurable sidebar component for displaying and editing
 * properties of selected workflow elements (nodes and edges).
 *
 * This component provides a flexible tab-based interface that can be extended with custom tabs.
 * By default, it shows a "Properties" tab for basic element properties. Additional tabs can be
 * added through the `tabs` prop to extend functionality.
 * When no custom tabs exist, the SegmentPicker is hidden for a cleaner UI
 */
function PropertiesBarComponent({
  selection,
  onMenuHeaderClick,
  onDeleteClick,
  headerLabel,
  deleteNodeLabel,
  deleteEdgeLabel,
  selectedTab,
  onTabChange,
  tabs = [],
}: PropertiesBarProps) {
  const MIN_WIDTH_PX = 270;
  const MAX_WIDTH_PX = 720;

  const [widthPx, setWidthPx] = useState<number>(MIN_WIDTH_PX);
  const resizeStateRef = useRef<{ startX: number; startWidth: number; isResizing: boolean } | null>(null);

  const name = selection?.node?.data?.properties?.label ?? selection?.edge?.data?.label;
  const isExpanded = !!selection;
  const hasCustomItems = tabs.length > 0;

  const handleResizeStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Only left-click / primary pointer
      if (event.button !== 0) return;

      event.preventDefault();
      event.stopPropagation();

      resizeStateRef.current = {
        startX: event.clientX,
        startWidth: widthPx,
        isResizing: true,
      };

      // Prevent text selection while resizing
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';
    },
    [widthPx],
  );

  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      const state = resizeStateRef.current;
      if (!state?.isResizing) return;

      // Dragging left edge: moving mouse left should increase width
      const delta = state.startX - event.clientX;
      const nextWidth = Math.min(MAX_WIDTH_PX, Math.max(MIN_WIDTH_PX, state.startWidth + delta));
      setWidthPx(nextWidth);
    }

    function onPointerUp() {
      const state = resizeStateRef.current;
      if (!state?.isResizing) return;

      resizeStateRef.current = null;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const segmentPicker = {
    when: () => isExpanded && !!selection?.node && selection.node.type === 'node' && hasCustomItems,
    component: () => (
      <SegmentPicker size="xxx-small" value={selectedTab} onChange={(_, value) => onTabChange(value)}>
        {[
          <SegmentPicker.Item key="properties" value="properties">
            Properties
          </SegmentPicker.Item>,
          ...tabs.map(({ label, value }) => (
            <SegmentPicker.Item key={value} value={value}>
              {label}
            </SegmentPicker.Item>
          )),
        ]}
      </SegmentPicker>
    ),
  };

  const contentComponents: PropertiesBarItem[] = [
    {
      when: ({ selection, selectedTab }) => !!selection.node && selectedTab === 'properties',
      component: ({ selection }) => <NodeProperties node={selection.node!} />,
    },
    {
      when: ({ selection }) => !!selection.edge,
      component: ({ selection }) => <EdgeProperties edge={selection.edge!} />,
    },
    ...tabs.flatMap((tab) => tab.components),
  ];

  return (
    <div className={clsx(styles.sidebar, { [styles.expanded]: isExpanded })} style={{ width: widthPx }}>
      <div className={styles['resize-handle']} onPointerDown={handleResizeStart} />
      {/* Header */}
      <div className={styles.header}>
        <PropertiesBarHeader
          isExpanded={isExpanded}
          header={headerLabel}
          name={name ?? ''}
          onDotsClick={onMenuHeaderClick}
        />
        {isExpanded && renderComponent([segmentPicker], selection, selectedTab)}
      </div>

      {/* Content */}
      {isExpanded && (
        <>
          <Separator />
          <div className={styles.content}>
            {renderComponent(contentComponents, selection, selectedTab)}
          </div>

          {/* Footer */}
          <Separator />
          <div className={styles.footer}>
            <Button 
              onClick={onDeleteClick} 
              variant="ghost" 
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              {selection?.node ? deleteNodeLabel : deleteEdgeLabel}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export const PropertiesBar = withOptionalComponentPlugins(PropertiesBarComponent, 'PropertiesBar');
