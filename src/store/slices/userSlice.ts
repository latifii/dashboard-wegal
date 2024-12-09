import type { PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

import type { UserState } from './slices.types';

const initialState: UserState = {
  phoneNumber: null,
  userName: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.phoneNumber = action.payload.phoneNumber ?? state.phoneNumber;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser: (state) => {
      state.phoneNumber = null;
      state.userName = null;
      state.firstName = null;
      state.lastName = null;
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
