import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Spreadsheet, Worksheet } from '@jspreadsheet-ce/react';
import 'jsuites/dist/jsuites.css';
import 'jspreadsheet-ce/dist/jspreadsheet.css';
import styles from './sheet-editor.module.css';
import type { FormQuestion, FormSignature, FormTime } from '../block-note-editor/answer-menu';

type ColumnDef = { field: string; headerName: string; width?: number };
type TokenOption = { label: string; value: string; group: string };

export interface SheetEditorProps {
  nodeId: string;
  initialContent?: {
    columnDefs?: ColumnDef[];
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

const toColumnLetter = (index: number): string => {
  let n = index;
  let result = '';
  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
};

// Helper function to create initial 20 rows x 10 columns (A-J)
const createDefaultTableStructure = () => {
  const columnDefs: ColumnDef[] = [];
  for (let i = 0; i < 10; i++) {
    columnDefs.push({
      field: `col${i + 1}`,
      headerName: toColumnLetter(i),
      width: 150,
    });
  }

  const rowData: Record<string, any>[] = [];
  for (let i = 0; i < 20; i++) {
    const row: Record<string, any> = {};
    for (let j = 0; j < 10; j++) {
      // New sheets should start empty (no default values in column A)
      row[`col${j + 1}`] = '';
    }
    rowData.push(row);
  }

  return { columnDefs, rowData };
};

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
    const containerRef = useRef<HTMLDivElement>(null);
    const spreadsheetRef = useRef<any>(null);
    const [jssInstance, setJssInstance] = useState<any>(null);
    const lastClickedCellRef = useRef<{ x: number; y: number } | null>(null);
    const onChangeRef = useRef<SheetEditorProps['onChange']>(onChange);

    const defaultStructure = useMemo(() => createDefaultTableStructure(), []);

    const [columnDefs, setColumnDefs] = useState<ColumnDef[]>(
      initialContent?.columnDefs || defaultStructure.columnDefs,
    );

    const [rowData, setRowData] = useState<Record<string, any>[]>(
      initialContent?.rowData || defaultStructure.rowData,
    );

    const [cellFormatting, setCellFormatting] = useState<Record<string, Set<string>>>(() => {
      const raw = initialContent?.cellFormatting || {};
      const normalized: Record<string, Set<string>> = {};
      for (const [key, value] of Object.entries(raw)) {
        if (value instanceof Set) {
          normalized[key] = value;
        } else {
          normalized[key] = new Set(Array.from(value as Iterable<string>));
        }
      }
      return normalized;
    });

    // Some jspreadsheet callbacks are bound once; keep live refs to avoid stale state.
    const columnDefsRef = useRef(columnDefs);
    const rowDataRef = useRef(rowData);
    const cellFormattingRef = useRef(cellFormatting);

    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
      columnDefsRef.current = columnDefs;
    }, [columnDefs]);

    useEffect(() => {
      rowDataRef.current = rowData;
    }, [rowData]);

    useEffect(() => {
      cellFormattingRef.current = cellFormatting;
    }, [cellFormatting]);

    useEffect(() => {
      if (!selected) return;
    }, [selected]);

    const buildTokenOptions = useCallback(
      (
        qs: FormQuestion[],
        sigs: FormSignature[],
        ts: FormTime[],
      ): Array<{ label: string; value: string; group: string }> => {
        const options: Array<{ label: string; value: string; group: string }> = [];

        for (const q of qs) {
          options.push({
            label: `${q.id}: ${q.label || 'Question'}`,
            value: `{${q.id}}`,
            group: 'Answers',
          });
        }

        for (const s of sigs) {
          options.push({
            label: s.id,
            value: `{${s.id}}`,
            group: 'Signatures',
          });
        }

        for (const t of ts) {
          options.push({
            label: t.id,
            value: `{${t.id}}`,
            group: 'Times',
          });
        }

        return options;
      },
      [],
    );

    const tokenOptions = useMemo(
      () => buildTokenOptions(questions, signatures, times),
      [questions, signatures, times, buildTokenOptions],
    );

    const columnFields = useMemo(() => columnDefs.map((c) => c.field), [columnDefs]);
    const columnFieldsRef = useRef(columnFields);

    useEffect(() => {
      columnFieldsRef.current = columnFields;
    }, [columnFields]);

    const data = useMemo(
      () => rowData.map((row) => columnFields.map((field) => row[field] ?? '')),
      [rowData, columnFields],
    );

    useEffect(() => {
      console.debug('[SheetEditor] Initialization:', {
        columnDefs: columnDefs.length,
        rowData: rowData.length,
        data: data.length,
        dataColumns: data[0]?.length,
      });
    }, [columnDefs.length, rowData.length, data]);

    const getWorksheet = useCallback(() => {
      // Prefer the last onload worksheet instance, fallback to spreadsheet ref
      if (jssInstance) return jssInstance;
      const ref = spreadsheetRef.current;
      return ref && Array.isArray(ref) ? ref[0] : ref?.current?.[0] ?? ref?.[0];
    }, [jssInstance]);

    const emitChange = useCallback(
      (nextColumns: ColumnDef[], nextRows: Record<string, any>[], nextFormatting: Record<string, Set<string>>) => {
        const cb = onChangeRef.current;
        if (!cb) return;
        cb({ columnDefs: nextColumns, rowData: nextRows, cellFormatting: nextFormatting });
      },
      [],
    );

    const refreshFromInstance = useCallback(() => {
      const ws = getWorksheet();
      if (!ws?.getData) return;
      const matrix: string[][] = ws.getData();
      const currentColumns = columnDefsRef.current;
      const currentFormatting = cellFormattingRef.current;
      const colCount = matrix?.[0]?.length ?? currentColumns.length;
      const nextColumns: ColumnDef[] = Array.from({ length: colCount }, (_v, idx) => ({
        field: `col${idx + 1}`,
        headerName: toColumnLetter(idx),
        width: currentColumns[idx]?.width ?? 150,
      }));
      const nextRows = (matrix || []).map((rowArr) => {
        const row: Record<string, unknown> = {};
        nextColumns.forEach((c, i) => {
          row[c.field] = rowArr?.[i] ?? '';
        });
        return row;
      });
      setColumnDefs(nextColumns);
      setRowData(nextRows as Record<string, unknown>[]);
      emitChange(nextColumns, nextRows as Record<string, unknown>[], currentFormatting);
    }, [emitChange, getWorksheet]);

    // Ensure we persist any in-progress edits when collapsing/unmounting.
    useEffect(() => {
      return () => {
        try {
          refreshFromInstance();
        } catch {
          // Best-effort flush.
        }
      };
    }, [refreshFromInstance]);

    

    const applyFormatting = useCallback(
      (instance: any, formatting: Record<string, Set<string>>) => {
        if (!instance) return;
        Object.entries(formatting).forEach(([key, formats]) => {
          const [rowStr, colField] = key.split('-');
          const rowIndex = Number(rowStr);
          const colIndex = columnFields.findIndex((f) => f === colField);
          if (colIndex === -1 || Number.isNaN(rowIndex)) return;
          const cellRef = `${toColumnLetter(colIndex)}${rowIndex + 1}`;
          const style = formats.has('bold') ? 'font-weight: 600;' : 'font-weight: normal;';
          instance.setStyle?.(cellRef, style);
        });
      },
      [columnFields],
    );

    useEffect(() => {
      applyFormatting(jssInstance, cellFormatting);
    }, [applyFormatting, cellFormatting, jssInstance]);

    const handleChange = useCallback(
      (_instance: any, _cell: any, x: number, y: number, value: string) => {
        const fields = columnFieldsRef.current;
        const field = fields[x];
        if (!field) return;
        const currentRows = rowDataRef.current;
        const newRowData = [...currentRows];
        const row = { ...(newRowData[y] || {}) };
        row[field] = value;
        newRowData[y] = row;
        setRowData(newRowData);
        emitChange(columnDefsRef.current, newRowData, cellFormattingRef.current);
      },
      [emitChange],
    );

    const handleSelection = useCallback(
      (
        _instance: unknown,
        borderLeftIndex: number,
        borderTopIndex: number,
        _borderRightIndex?: number,
        _borderBottomIndex?: number,
        _origin?: unknown,
      ) => {
        // For single cell selection, use top-left corner
        const x = borderLeftIndex;
        const y = borderTopIndex;
        if (x == null || y == null || x < 0 || y < 0) return;
        console.debug('[SheetEditor] onselection', { x, y, borderLeftIndex, borderTopIndex });
        lastClickedCellRef.current = { x, y };
      },
      [],
    );
    
    const insertToken = useCallback(
      (token: string) => {
        if (!token) return;
        const ws = getWorksheet();
        let x = -1;
        let y = -1;
        
        console.debug('[SheetEditor] === TOKEN INSERTION START ===');
        console.debug('[SheetEditor] Worksheet instance exists:', !!ws);
        
        // Strategy 1: Use getSelection() - returns [x1, y1, x2, y2] or null
        if (ws?.getSelection) {
          try {
            const selection = ws.getSelection();
            console.debug('[SheetEditor] ws.getSelection():', selection);
            if (Array.isArray(selection) && selection.length >= 2) {
              x = selection[0]; // borderLeftIndex
              y = selection[1]; // borderTopIndex
              console.debug('[SheetEditor] ✓ Strategy 1 (getSelection):', { x, y });
            }
          } catch (e) {
            console.error('[SheetEditor] getSelection error:', e);
          }
        }
        
        // Strategy 2: Use getHighlighted()
        if ((x < 0 || y < 0) && ws?.getHighlighted) {
          try {
            const highlighted = ws.getHighlighted();
            console.debug('[SheetEditor] ws.getHighlighted():', highlighted);
            if (Array.isArray(highlighted) && highlighted.length >= 2) {
              x = highlighted[0];
              y = highlighted[1];
              console.debug('[SheetEditor] ✓ Strategy 2 (getHighlighted):', { x, y });
            }
          } catch (e) {
            console.error('[SheetEditor] getHighlighted error:', e);
          }
        }
        
        // Strategy 3: Use lastClickedCellRef as fallback
        if ((x < 0 || y < 0) && lastClickedCellRef.current) {
          x = lastClickedCellRef.current.x;
          y = lastClickedCellRef.current.y;
          console.debug('[SheetEditor] ✓ Strategy 3 (lastClickedCellRef):', { x, y });
        }
        
        // Final fallback: A1
        if (x < 0 || y < 0 || x >= columnFields.length || y >= rowData.length) {
          console.warn('[SheetEditor] ⚠ No valid selection, falling back to A1');
          x = 0;
          y = 0;
        }
        
        const field = columnFields[x];
        const cellRef = `${toColumnLetter(x)}${y + 1}`;
        const currentValue = (rowData[y]?.[field] as string) ?? '';
        const appended = `${currentValue}${token}`;
        
        console.debug('[SheetEditor] Final target:', { x, y, field, cellRef, token, currentValue, appended });
        
        // Update worksheet and apply orange background
        try {
          ws?.setValue?.(cellRef, appended);
          ws?.setStyle?.(cellRef, 'background-color: #FFEDD5;');
          console.debug('[SheetEditor] ✓ Token inserted and styled');
        } catch (e) {
          console.error('[SheetEditor] setValue/setStyle error:', e);
        }
        
        // Update local state
        const newRowData = [...rowData];
        if (!newRowData[y]) newRowData[y] = {} as Record<string, unknown>;
        newRowData[y][field] = appended;
        setRowData(newRowData);
        emitChange(columnDefs, newRowData, cellFormatting);
        console.debug('[SheetEditor] === TOKEN INSERTION COMPLETE ===');
      },
      [columnFields, rowData, emitChange, columnDefs, cellFormatting, getWorksheet],
    );

    const onAddRow = useCallback(() => {
      const ws = getWorksheet();
      if (ws?.insertRow) {
        ws.insertRow();
        // Set auto-number in first column for the new last row
        try {
          const matrix: string[][] = ws.getData?.() || [];
          const rowIndex = Math.max(0, matrix.length - 1);
          const cellRef = `A${rowIndex + 1}`;
          ws.setValue?.(cellRef, String(rowIndex + 1));
        } catch {}
        refreshFromInstance();
        return;
      }
      // Fallback: state update
      const newRow: Record<string, unknown> = {};
      for (const col of columnDefs) newRow[col.field] = '';
      if (columnDefs[0]) newRow[columnDefs[0].field] = String(rowData.length + 1);
      const newRowData = [...rowData, newRow];
      setRowData(newRowData);
      emitChange(columnDefs, newRowData, cellFormatting);
    }, [columnDefs, rowData, emitChange, cellFormatting, getWorksheet, refreshFromInstance]);

    const onDeleteRow = useCallback(() => {
      const ws = getWorksheet();
      if (ws?.deleteRow) {
        ws.deleteRow();
        refreshFromInstance();
        return;
      }
      if (rowData.length <= 1) return;
      const newRowData = rowData.slice(0, -1);
      setRowData(newRowData);
      emitChange(columnDefs, newRowData, cellFormatting);
    }, [rowData, emitChange, columnDefs, cellFormatting, getWorksheet, refreshFromInstance]);

    const onAddColumn = useCallback(() => {
      const ws = getWorksheet();
      if (ws?.insertColumn) {
        ws.insertColumn();
        try {
          const matrix: string[][] = ws.getData?.() || [];
          const colCount = matrix?.[0]?.length ?? columnDefs.length + 1;
          ws.setHeader?.(Array.from({ length: colCount }, (_v, idx) => toColumnLetter(idx)));
        } catch {}
        refreshFromInstance();
        return;
      }
      const fieldName = generateFieldName(columnDefs.length);
      const letterHeader = toColumnLetter(columnDefs.length);
      const newColumn: ColumnDef = { field: fieldName, headerName: letterHeader, width: 150 };
      const newColumnDefs = [...columnDefs, newColumn];
      const newRowData = rowData.map((row) => ({ ...row, [fieldName]: '' }));
      setColumnDefs(newColumnDefs);
      setRowData(newRowData);
      emitChange(newColumnDefs, newRowData, cellFormatting);
    }, [columnDefs, rowData, emitChange, cellFormatting, getWorksheet, refreshFromInstance]);

    const onDeleteColumn = useCallback(() => {
      const ws = getWorksheet();
      if (ws?.deleteColumn) {
        ws.deleteColumn();
        try {
          const matrix: string[][] = ws.getData?.() || [];
          const colCount = matrix?.[0]?.length ?? Math.max(0, columnDefs.length - 1);
          ws.setHeader?.(Array.from({ length: colCount }, (_v, idx) => toColumnLetter(idx)));
        } catch {}
        refreshFromInstance();
        return;
      }
      if (columnDefs.length <= 1) return;
      const fieldToRemove = columnDefs.at(-1)?.field;
      const newColumnDefs = columnDefs.slice(0, -1);
      const newRowData = rowData.map((row) => {
        const nextRow = { ...row } as Record<string, unknown>;
        if (fieldToRemove) delete nextRow[fieldToRemove];
        return nextRow;
      });
      setColumnDefs(newColumnDefs);
      setRowData(newRowData);
      emitChange(newColumnDefs, newRowData, cellFormatting);
    }, [columnDefs, rowData, emitChange, cellFormatting, getWorksheet, refreshFromInstance]);


    const columnConfig = useMemo(
      () =>
        columnDefs.map((col) => ({
          title: col.headerName,
          width: col.width,
        })),
      [columnDefs],
    );

    const groupedTokens = useMemo(() => {
      const groups: Record<string, TokenOption[]> = {};
      for (const token of tokenOptions) {
        const group = token.group || 'Other';
        if (!groups[group]) groups[group] = [];
        groups[group].push(token);
      }
      return groups;
    }, [tokenOptions]);

    return (
      <div
        ref={containerRef}
        className={`${styles['sheet-container']} ${selected ? styles['selected'] : ''} nodrag`}
      >
        <div className={styles['grid-wrapper']}>
          <Spreadsheet
            ref={spreadsheetRef}
            tabs={false}
            toolbar={(tb: any) => {
              try {
                tb.items.push({ tooltip: 'Add Row', content: 'add', onclick: onAddRow });
                tb.items.push({ tooltip: 'Delete Row', content: 'remove', onclick: onDeleteRow });
                tb.items.push({ tooltip: 'Add Column', content: 'Add', onclick: onAddColumn });
                tb.items.push({ tooltip: 'Delete Column', content: 'Remove', onclick: onDeleteColumn });
                // Add Insert Token as dropdown on the right
                if (tokenOptions.length > 0) {
                  tb.items.push({
                    type: 'select',
                    width: '160px',
                    k: 'insert-token',
                    v: tokenOptions.map((t) => t.value),
                    value: -1,
                    render: function(value: string) {
                      if (!value) return 'Insert Token';
                      const token = tokenOptions.find((t) => t.value === value);
                      return token ? token.label : 'Insert Token';
                    },
                    onchange: function(a: any, b: any, c: any, selectedValue: string) {
                      if (selectedValue) {
                        insertToken(selectedValue);
                        // Reset dropdown to show "Insert Token" again
                        setTimeout(() => {
                          if (b && b.setValue) {
                            b.setValue(-1);
                          }
                        }, 100);
                      }
                    },
                  });
                }
              } catch {}
              return tb;
            }}
            className={styles['spreadsheet']}
          >
            <Worksheet
              data={data}
              columns={columnConfig}
              minDimensions={[columnDefs.length || 1, rowData.length || 1]}
              editable={true}
              onevent={(eventName: string, a?: unknown, b?: unknown, c?: unknown, d?: unknown, e?: unknown, f?: unknown) => {
                console.debug('[SheetEditor] onevent', eventName, { a, b, c, d });
                if (eventName === 'onselection' || eventName === 'onfocus') {
                  // For onselection: a=instance, b=borderLeftIndex, c=borderTopIndex, d=borderRightIndex, e=borderBottomIndex
                  const x = typeof b === 'number' ? b : -1;
                  const y = typeof c === 'number' ? c : -1;
                  if (x >= 0 && y >= 0) {
                    console.debug('[SheetEditor] onevent:selection tracked', { eventName, x, y });
                    lastClickedCellRef.current = { x, y };
                  }
                }
              }}
              onchange={handleChange}
              onselection={handleSelection}
              onload={(instance: any) => {
                setJssInstance(instance);
                applyFormatting(instance, cellFormatting);
              }}
            />
          </Spreadsheet>
        </div>
      </div>
    );
  },
);

SheetEditor.displayName = 'SheetEditor';