import type { Notification } from '../../types/notification.type';

export type UserState = {
  phoneNumber: string | null;
  userName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export type NotificationType = Notification & {
  id?: string;
};

export type NotificationState = {
  notifications: NotificationType[];
};
