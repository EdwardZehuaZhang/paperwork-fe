"use client";

import React, {
  useMemo,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  Theme,
  themeQuartz,
} from "ag-grid-community";
import { IOlympicData } from "./interfaces";
import { useFetchJson } from "./useFetchJson";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  wrapperBorder: false,
  headerRowBorder: false,
  rowBorder: { style: 'dotted', width: 3, color: '#9696C8' },
  columnBorder: { style: 'dashed', color: '#9696C8' },
});

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const theme = useMemo<Theme | "legacy">(() => {
    return myTheme;
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    { field: "athlete", minWidth: 170 },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  const { data, loading } = useFetchJson<IOlympicData>(
    "https://www.ag-grid.com/example-assets/olympic-winners.json",
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact<IOlympicData>
          rowData={data}
          loading={loading}
          theme={theme}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <GridExample />
  </StrictMode>,
);

export default GridExample;
