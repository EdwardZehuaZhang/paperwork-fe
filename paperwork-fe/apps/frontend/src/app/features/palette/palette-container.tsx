import styles from './palette-container.module.css';
import './variables.css';
import { useEffect } from 'react';
import useStore from '@/store/store';
import { DraggedItem } from './components/dragged-item/dragged-item';
import { NodePreviewContainer } from './node-preview-container';
import { PaletteHeader } from './components/header/palette-header';
import { PaletteFooter } from './components/footer/palette-footer';
import { PaletteItems } from './components/items/palette-items';
import { usePaletteDragAndDrop } from './hooks/use-palette-drag-and-drop';
import { openTemplateSelectorModal } from '../modals/template-selector/open-template-selector-modal';
import clsx from 'clsx';

export function PaletteContainer() {
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const fetchData = useStore((state) => state.fetchData);

  const isSidebarExpanded = useStore((state) => state.isSidebarExpanded);
  const paletteItems = useStore((state) => state.data);
  const isReadOnlyMode = useStore((state) => state.isReadOnlyMode);

  const { draggedItem, zoom, ref, onMouseDown, onDragStart } = usePaletteDragAndDrop(!isReadOnlyMode);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={clsx(styles.sidebar, { [styles.expanded]: isSidebarExpanded })}>
      {/* Header */}
      <div className={styles.header}>
        <PaletteHeader onClick={() => toggleSidebar()} isSidebarExpanded={isSidebarExpanded} />
      </div>

      {/* Content */}
      {isSidebarExpanded && (
        <div className={styles.content}>
          <PaletteItems
            items={paletteItems}
            onMouseDown={onMouseDown}
            onDragStart={onDragStart}
            isDisabled={isReadOnlyMode}
          />
          {draggedItem && (
            <DraggedItem ref={ref} zoom={zoom}>
              <NodePreviewContainer type={draggedItem.type} />
            </DraggedItem>
          )}
        </div>
      )}

      {/* Footer */}
      {isSidebarExpanded && (
        <div className={styles.footer}>
          <PaletteFooter onTemplateClick={openTemplateSelectorModal} />
        </div>
      )}
    </div>
  );
}
