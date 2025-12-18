import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import TagManager from 'react-gtm-module';

import { App } from './app/app';
import './app/features/i18n';

const gtmId = import.meta.env.VITE_GTM_ID;
if (typeof gtmId === 'string' && gtmId.trim().length > 0) {
  TagManager.initialize({
    gtmId,
  });
}

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
