import 'src/global.css';

import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

import store from './store/store';
import { cacheRtl } from './theme/create-cache';
import { queryClient } from './configs/react-query';
import Notifications from './components/error-notification/notifications';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const githubButton = (
    <Fab
      size="medium"
      aria-label="ٌWegal"
      href="https://mattresswegal.com"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <CacheProvider value={cacheRtl}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider>
            <Notifications />
            <Router />
            {githubButton}
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </CacheProvider>
  );
}
