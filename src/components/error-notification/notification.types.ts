type NotificationT = {
  id?: string;
  message: string | null;
  status: 'idle' | 'error' | 'success' | 'warning' | 'info';
};

export type NotificationProps = {
  notification: NotificationT;
};
