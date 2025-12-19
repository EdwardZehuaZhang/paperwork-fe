import '../global.css';
// Plugins entry point
import '@/features/plugins-core/index';
import { PropsWithChildren } from 'react';
import { useDetectLanguageChange } from './features/i18n/use-detect-language-change';
import { CoexistenceDemo } from '../coexistence-demo';
import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { router } from './routing/router';
import { AuthProvider } from './auth/auth-context';

import './features/i18n/index';
import { withIntegration } from './features/integration/components/with-integration';

function AppComponent(_props: PropsWithChildren) {
  useDetectLanguageChange();

  return (
    <AuthProvider>
      <ReactRouterProvider router={router} />
    </AuthProvider>
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
