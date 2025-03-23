import { ThemeProvider } from '@emotion/react';
import { Theme } from '@radix-ui/themes';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import theme from './theme';

import '@radix-ui/themes/styles.css';

import './i18n';

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
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Theme>
    </StrictMode>
  );
}
