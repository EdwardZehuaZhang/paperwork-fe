import '../global.css';
import styles from './app.module.css';
// Plugins entry point
import '@/features/plugins-core/index';
import { PropsWithChildren } from 'react';
import { setAutoFreeze } from 'immer';
import { OptionalHooks } from './features/plugins-core/components/optional-hooks';
import { AppBarContainerLazy } from './features/app-bar/app-bar-container-lazy';
import { PropertiesBarContainerLazy } from './features/properties-bar/properties-bar-container-lazy';
import { AppLoaderContainer } from './features/integration/components/app-loader/app-loader-container';
import { DiagramContainer as Diagram } from './features/diagram/diagram';
import { PaletteContainerLazy } from './features/palette/palette-container-lazy';
import { ReactFlowProvider } from '@xyflow/react';
import { DiagramWrapper } from './features/diagram/diagram-wrapper';
import { SnackbarContainer } from './features/snackbar/snackbar-container';
import { useDetectLanguageChange } from './features/i18n/use-detect-language-change';
import { CoexistenceDemo } from '../coexistence-demo';
import { RouterProvider } from './router/router-context';
import { AppRouter } from './app-router';

import './features/i18n/index';
import { withIntegration } from './features/integration/components/with-integration';

function AppComponent(_props: PropsWithChildren) {
  useDetectLanguageChange();

  // Disable immer's automatic object freezing because ReactFlow mutates objects under the hood
  // and requires this to be turned off to function properly, especially when node size is updated
  setAutoFreeze(false);

  return (
    <RouterProvider>
      <AppRouter>
        <ReactFlowProvider>
          <div className={styles['container']}>
            <div className={styles['header']}>
              <AppBarContainerLazy />
            </div>
            <div className={styles['content']}>
              <div className={styles['panel']}>
                <PaletteContainerLazy />
              </div>
              <div className={styles['panel']}>
                <div className={styles['right-panel']}>
                  <PropertiesBarContainerLazy />
                </div>
              </div>
            </div>
            <DiagramWrapper>
              <Diagram />
            </DiagramWrapper>
            <SnackbarContainer />
            <AppLoaderContainer />
            <OptionalHooks />
          </div>
        </ReactFlowProvider>
      </AppRouter>
    </RouterProvider>
  );
}

type AppProps = React.ComponentProps<typeof AppComponent>;

function AppRoot() {
  // Show demo if ?demo=true is in URL - bypass integration wrapper
  const showDemo = new URLSearchParams(window.location.search).get('demo') === 'true';
  if (showDemo) {
    return <CoexistenceDemo />;
  }

  // Check app/features/integration/README.md for more information
  const WrappedApp = withIntegration<AppProps>(AppComponent);
  return <WrappedApp />;
}

export const App = AppRoot;
