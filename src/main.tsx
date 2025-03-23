import { Theme } from '@radix-ui/themes';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';

import '@radix-ui/themes/styles.css';

const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Theme accentColor="ruby" grayColor="mauve" radius="large" appearance="dark">
        <RouterProvider router={router} />
      </Theme>
    </StrictMode>
  );
}
