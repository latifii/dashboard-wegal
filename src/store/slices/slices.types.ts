import type { Notification } from '../../types/notification.type';

export type UserState = {
  id: string | null;
  name: string | null;
};

export type NotificationType = Notification & {
  id?: string;
};

export type NotificationState = {
  notifications: NotificationType[];
};
