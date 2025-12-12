import React from 'react';
import { Suspense } from 'react';

const ShadcnAppBar = React.lazy(() =>
  import('./shadcn-app-bar').then((module) => ({ default: module.ShadcnAppBar })),
);

/*
  It prevents the sidebars from moving if they loaded earlier.
*/
const expectedAppBarHeight = '62px';

export function AppBarContainerLazy() {
  return (
    <Suspense fallback={<div style={{ height: expectedAppBarHeight }} />}>
      <ShadcnAppBar />
    </Suspense>
  );
}
