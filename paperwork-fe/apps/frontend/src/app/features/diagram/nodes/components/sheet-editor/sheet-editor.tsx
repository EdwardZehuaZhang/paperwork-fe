import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { ColDef, GridReadyEvent, CellEditingStoppedEvent, CellClassParams } from 'ag-grid-community';
import { ensureAgGridModulesRegistered } from '@/lib/ag-grid/register-ag-grid';
import styles from './sheet-editor.module.css';
import { SheetHeaderComponent } from './sheet-header-component';
import type { FormQuestion, FormSignature, FormTime } from '../block-note-editor/answer-menu';

ensureAgGridModulesRegistered();

export interface SheetEditorProps {
  nodeId: string;
  initialContent?: {
    columnDefs?: ColDef[];
    rowData?: Record<string, any>[];
    cellFormatting?: Record<string, Set<string>>;
  };
  onChange?: (content: any) => void;
  selected?: boolean;
  questions?: FormQuestion[];
  signatures?: FormSignature[];
  times?: FormTime[];
}

const generateFieldName = (index: number): string => `col${index + 1}`;

export const SheetEditor = memo(
  ({
    nodeId,
    initialContent,
    onChange,
    selected = false,
    questions = [],
    signatures = [],
    times = [],
  }: SheetEditorProps) => {
    const gridRef = useRef<AgGridReact>(null);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(
      initialContent?.columnDefs || [
        {
          field: 'col1',
          headerName: 'Column 1',
          width: 150,
          editable: true,
          resizable: true,
          headerComponent: (props: any) => (
            <SheetHeaderComponent
              displayName={props.displayName}
              columnIndex={props.colIndex}
              tokenOptions={buildTokenOptions(questions, signatures, times)}
              onTokenInsert={(token) => handleTokenInsert(token, props.colId)}
            />
          ),
        },
      ],
    );

    const [rowData, setRowData] = useState<Record<string, any>[]>(
      initialContent?.rowData || [{ col1: '' }],
    );

    const [cellFormatting, setCellFormatting] = useState<Record<string, Set<string>>>(
      initialContent?.cellFormatting || {},
    );

    const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);

    // Build token options for the menu
    const buildTokenOptions = useCallback(
      (
        qs: FormQuestion[],
        sigs: FormSignature[],
        ts: FormTime[],
      ): Array<{ label: string; value: string; group: string }> => {
        const options: Array<{ label: string; value: string; group: string }> = [];

        qs.forEach((q) => {
          options.push({
            label: `${q.id}: ${q.label || 'Question'}`,
            value: `{${q.id}}`,
            group: 'Answers',
          });
        });

        sigs.forEach((s) => {
          options.push({
            label: s.id,
            value: `{${s.id}}`,
            group: 'Signatures',
          });
        });

        ts.forEach((t) => {
          options.push({
            label: t.id,
            value: `{${t.id}}`,
            group: 'Times',
          });
        });

        return options;
      },
      [],
    );

    const tokenOptions = useMemo(
      () => buildTokenOptions(questions, signatures, times),
      [questions, signatures, times, buildTokenOptions],
    );

    const handleTokenInsert = useCallback(
      (token: string, columnField: string) => {
        if (!selectedCell) {
          // Insert into first row of the column if no cell is selected
          const rowIndex = 0;
          const newRowData = [...rowData];
          if (newRowData[rowIndex]) {
            newRowData[rowIndex][columnField] = (newRowData[rowIndex][columnField] || '') + token;
            setRowData(newRowData);
            if (onChange) {
              onChange({ columnDefs, rowData: newRowData, cellFormatting });
            }
          }
          return;
        }

        // Insert into selected cell
        const newRowData = [...rowData];
        const cell = newRowData[selectedCell.row];
        if (cell) {
          cell[selectedCell.col] = (cell[selectedCell.col] || '') + token;
          setRowData(newRowData);
          if (onChange) {
            onChange({ columnDefs, rowData: newRowData, cellFormatting });
          }
        }
      },
      [selectedCell, rowData, columnDefs, cellFormatting, onChange],
    );

    const addRow = useCallback(() => {
      const newRow: Record<string, any> = {};
      columnDefs.forEach((col) => {
        newRow[col.field as string] = '';
      });
      const newRowData = [...rowData, newRow];
      setRowData(newRowData);
      if (onChange) {
        onChange({ columnDefs, rowData: newRowData, cellFormatting });
      }
    }, [columnDefs, rowData, cellFormatting, onChange]);

    const deleteLastRow = useCallback(() => {
      if (rowData.length > 1) {
        const newRowData = rowData.slice(0, -1);
        setRowData(newRowData);
        if (onChange) {
          onChange({ columnDefs, rowData: newRowData, cellFormatting });
        }
      }
    }, [rowData, columnDefs, cellFormatting, onChange]);

    const addColumn = useCallback(() => {
      const columnIndex = columnDefs.length + 1;
      const fieldName = generateFieldName(columnDefs.length);
      const newColumn: ColDef = {
        field: fieldName,
        headerName: `Column ${columnIndex}`,
        width: 150,
        editable: true,
        resizable: true,
        headerComponent: (props: any) => (
          <SheetHeaderComponent
            displayName={props.displayName}
            columnIndex={props.colIndex}
            tokenOptions={tokenOptions}
            onTokenInsert={(token) => handleTokenInsert(token, props.colId)}
          />
        ),
      };

      const newColumnDefs = [...columnDefs, newColumn];
      const newRowData = rowData.map((row) => ({
        ...row,
        [fieldName]: '',
      }));

      setColumnDefs(newColumnDefs);
      setRowData(newRowData);
      if (onChange) {
        onChange({ columnDefs: newColumnDefs, rowData: newRowData, cellFormatting });
      }
    }, [columnDefs, rowData, tokenOptions, cellFormatting, onChange, handleTokenInsert]);

    const deleteLastColumn = useCallback(() => {
      if (columnDefs.length > 1) {
        const fieldToRemove = columnDefs[columnDefs.length - 1].field;
        const newColumnDefs = columnDefs.slice(0, -1);
        const newRowData = rowData.map((row) => {
          const newRow = { ...row };
          delete newRow[fieldToRemove as string];
          return newRow;
        });

        setColumnDefs(newColumnDefs);
        setRowData(newRowData);
        if (onChange) {
          onChange({ columnDefs: newColumnDefs, rowData: newRowData, cellFormatting });
        }
      }
    }, [columnDefs, rowData, cellFormatting, onChange]);

    const toggleBold = useCallback(() => {
      if (!selectedCell) return;

      const key = `${selectedCell.row}-${selectedCell.col}`;
      const newFormatting = { ...cellFormatting };

      if (!newFormatting[key]) {
        newFormatting[key] = new Set();
      }

      if (newFormatting[key].has('bold')) {
        newFormatting[key].delete('bold');
      } else {
        newFormatting[key].add('bold');
      }

      // Remove entry if no formatting
      if (newFormatting[key].size === 0) {
        delete newFormatting[key];
      }

      setCellFormatting(newFormatting);
      if (onChange) {
        onChange({ columnDefs, rowData, cellFormatting: newFormatting });
      }
    }, [selectedCell, cellFormatting, columnDefs, rowData, onChange]);

    const onGridReady = useCallback((event: GridReadyEvent) => {
      // Grid ready
    }, []);

    const onCellEditingStopped = useCallback(
      (event: CellEditingStoppedEvent) => {
        setRowData([...rowData]);
        if (onChange) {
          onChange({ columnDefs, rowData, cellFormatting });
        }
      },
      [rowData, columnDefs, cellFormatting, onChange],
    );

    const onCellClicked = useCallback((event: any) => {
      setSelectedCell({
        row: event.rowIndex,
        col: event.colDef.field,
      });
    }, []);

    const getCellClass = useCallback(
      (params: CellClassParams) => {
        const key = `${params.rowIndex}-${params.colDef.field}`;
        const formatting = cellFormatting[key];
        if (formatting?.has('bold')) {
          return 'bold-cell';
        }
        return '';
      },
      [cellFormatting],
    );

    React.useEffect(() => {
      // Debug: log current grid state to help diagnose rendering/interactions
      // This will appear in browser console when the node is expanded.
      // Keep lightweight and conditional to avoid noisy logs.
      console.debug('[SheetEditor] columnDefs', columnDefs, 'rowData', rowData, 'cellFormatting', cellFormatting);
    }, [columnDefs, rowData, cellFormatting]);

    return (
      <div className={`${styles['sheet-container']} ${selected ? styles['selected'] : ''} ag-theme-quartz`}>
        <div className={styles['toolbar']}>
          <button className={styles['toolbar-button']} onClick={addRow} title="Add row">
            Add Row
          </button>
          <button className={styles['toolbar-button']} onClick={deleteLastRow} title="Delete last row">
            Delete Row
          </button>
          <button className={styles['toolbar-button']} onClick={addColumn} title="Add column">
            Add Column
          </button>
          <button className={styles['toolbar-button']} onClick={deleteLastColumn} title="Delete last column">
            Delete Column
          </button>
          <button className={styles['toolbar-button']} onClick={toggleBold} title="Toggle bold formatting" disabled={!selectedCell}>
            <strong>B</strong>
          </button>
        </div>
        <div className={styles['grid-wrapper']}>
          <div style={{ width: '100%', height: '100%' }}>
            <AgGridReact
              ref={gridRef}
              columnDefs={columnDefs}
              rowData={rowData}
              onGridReady={onGridReady}
              onCellEditingStopped={onCellEditingStopped}
              onCellClicked={onCellClicked}
              domLayout="normal"
              defaultColDef={{
                resizable: true,
                editable: true,
                cellClass: getCellClass,
              }}
            />
          </div>
        </div>
      </div>
    );
  },
);

SheetEditor.displayName = 'SheetEditor';
