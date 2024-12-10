import 'src/global.css';

import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { cacheRtl } from './theme/create-cache';
import { store, persistor } from './store/store';
import { queryClient } from './configs/react-query';
import Notifications from './components/error-notification/notifications';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <CacheProvider value={cacheRtl}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider>
              <Notifications />
              <Router />
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
}
