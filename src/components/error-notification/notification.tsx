import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import { Box, Alert, Snackbar, LinearProgress } from '@mui/material';

import { clearNotification } from 'src/store/slices/notificationSlice';

import type { NotificationProps } from './notification.types';

// eslint-disable-next-line react/prop-types
const Notification: React.FC<NotificationProps> = ({ notification: { id, message, status } }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const duration = 4000;

  const handleClose = useCallback(() => {
    setOpen(false);
    if (id) {
      dispatch(clearNotification(id));
    } else {
      console.error('Notification ID is undefined');
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (message) {
      setOpen(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 100 / (duration / 100), 100);
          return newProgress;
        });
      }, duration / 100);

      const timeout = setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [message, duration, handleClose]);

  return (
    <Snackbar open={open} sx={{ position: 'relative' }}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Alert
          onClose={handleClose}
          severity={status === 'idle' ? 'info' : status}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
        <LinearProgress
          sx={{ borderRadius: '2rem' }}
          color={status === 'idle' ? 'info' : status}
          variant="determinate"
          value={progress}
        />
      </Box>
    </Snackbar>
  );
};

export default Notification;
