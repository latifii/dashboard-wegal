// eslint-disable-next-line import/no-extraneous-dependencies
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';
import notificationReducer from './slices/notificationSlice';

const persistConfig = {
  key: 'user',
  storage,
  // whitelist: ['user'],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    error: errorReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
