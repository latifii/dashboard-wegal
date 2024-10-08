// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
