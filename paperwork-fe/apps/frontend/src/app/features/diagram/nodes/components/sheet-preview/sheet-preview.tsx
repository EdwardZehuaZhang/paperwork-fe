import React, { memo, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { ColDef, CellClassParams } from 'ag-grid-community';
import { ensureAgGridModulesRegistered } from '@/lib/ag-grid/register-ag-grid';
import styles from './sheet-preview.module.css';

ensureAgGridModulesRegistered();

export interface SheetPreviewProps {
  sheetContent?: {
    columnDefs?: ColDef[];
    rowData?: Record<string, any>[];
    cellFormatting?: Record<string, Set<string>>;
  };
}

export const SheetPreview = memo(({ sheetContent }: SheetPreviewProps) => {
  const columnDefs = useMemo(() => {
    const cols = sheetContent?.columnDefs || [];
    return cols.map((col) => ({
      ...col,
      editable: false,
      resizable: true,
    }));
  }, [sheetContent?.columnDefs]);

  const rowData = useMemo(() => sheetContent?.rowData || [], [sheetContent?.rowData]);

  const cellFormatting = useMemo(() => sheetContent?.cellFormatting || {}, [sheetContent?.cellFormatting]);

  const getCellClass = (params: CellClassParams) => {
    const key = `${params.rowIndex}-${params.colDef.field}`;
    const formatting = cellFormatting[key];
    if (formatting?.has('bold')) {
      return 'bold-cell';
    }
    return '';
  };

  if (!columnDefs || columnDefs.length === 0) {
    return (
      <div className={styles['empty-container']}>
        <span className="ax-public-p11">No sheet content</span>
      </div>
    );
  }

  return (
    <div className={`${styles['preview-container']} ag-theme-quartz`}>
      <div className={styles['grid-wrapper']}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          domLayout="normal"
          defaultColDef={{
            resizable: true,
            editable: false,
            cellClass: getCellClass,
          }}
        />
      </div>
    </div>
  );
});

SheetPreview.displayName = 'SheetPreview';
