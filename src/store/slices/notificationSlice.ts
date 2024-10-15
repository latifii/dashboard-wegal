import type { PayloadAction } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

import type { NotificationType, NotificationState } from './slices.types';

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationType>) => {
      const notificationWithId = { ...action.payload, id: uuidv4() };
      state.notifications.push(notificationWithId);
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
