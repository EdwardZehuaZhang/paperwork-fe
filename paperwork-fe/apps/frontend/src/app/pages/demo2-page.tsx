import { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';

import { ensureAgGridModulesRegistered } from '@/lib/ag-grid/register-ag-grid';

ensureAgGridModulesRegistered();

type IOlympicData = {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};

const myTheme = themeQuartz.withParams({
  wrapperBorder: false,
  headerRowBorder: false,
  rowBorder: { style: 'dotted', width: 3, color: '#9696C8' },
  columnBorder: { style: 'dashed', color: '#9696C8' },
});

function useFetchJson<T>(url: string, limit?: number) {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        const json = await response.json();
        const nextData = limit ? (json as T[]).slice(0, limit) : (json as T[]);
        setData(nextData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url, limit]);

  return { data, loading };
}

export function Demo2Page() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const theme = useMemo(() => myTheme, []);

  const [columnDefs] = useState<ColDef<IOlympicData>[]>([
    { field: 'athlete', minWidth: 170 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);

  const { data, loading } = useFetchJson<IOlympicData>(
    'https://www.ag-grid.com/example-assets/olympic-winners.json',
  );

  return (
    <div className="p-6" style={containerStyle}>
      <h1 className="text-xl font-semibold">AG Grid Demo 2</h1>
      <p className="text-sm text-muted-foreground">
        Theming API (themeQuartz.withParams) — borders should be visible.
      </p>

      <div style={{ ...gridStyle, marginTop: 16, minHeight: 500 }}>
        <AgGridReact<IOlympicData>
          rowData={data}
          loading={loading}
          theme={theme}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
}
