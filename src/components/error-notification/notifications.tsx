import type { RootState } from 'src/store/store';
import type { NotificationType } from 'src/store/slices/slices.types';

import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import Notification from './notification';

const Notifications: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  if (notifications.length < 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        flexDirection: 'column', // تغییر به column
        bottom: '1rem',
        right: '3rem',
        gap: '0.75rem',
        zIndex: 1000,
        maxWidth: '300px', // حداکثر عرض
      }}
    >
      {notifications.map((notification: NotificationType) => {
        return <Notification key={`notification-${notification.id}`} notification={notification} />;
      })}
    </Box>
  );
};

export default Notifications;
