export type Notification = {
  message: string | null;
  status: 'idle' | 'error' | 'success' | 'warning' | 'info';
};
