import type { PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

import type { ErrorState } from './slices.types';

const initialState: ErrorState = {
  message: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearErrors: (state) => {
      state.message = null;
    },
  },
});

export const { clearErrors, setErrors } = errorSlice.actions;

export default errorSlice.reducer;
