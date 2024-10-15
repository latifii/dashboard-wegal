import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from 'src/types/notification.type';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

const initialState: Notification = {
  message: null,
  status: 'idle',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.status = 'error';
    },
    clearErrors: (state) => {
      state.message = null;
      state.status = 'idle';
    },
  },
});

export const { clearErrors, setErrors } = errorSlice.actions;

export default errorSlice.reducer;
