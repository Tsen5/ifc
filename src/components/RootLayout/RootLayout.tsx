import { css, Global } from '@emotion/react';
import { Outlet } from '@tanstack/react-router';
import emotionReset from 'emotion-reset';

function RootLayout() {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}
        `}
      />
      <Outlet />
    </>
  );
}

export default RootLayout;
