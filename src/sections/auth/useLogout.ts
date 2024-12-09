import type { AxiosError } from 'axios';
import type { UseMutationResult } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

import { persistor } from 'src/store/store';
import { signOutApi } from 'src/services/authService';
import { clearUser } from 'src/store/slices/userSlice';
import { setNotification } from 'src/store/slices/notificationSlice';

type LogoutInput = string;
export function useLogout(): UseMutationResult<any, AxiosError, LogoutInput> {
  const dispatch = useDispatch();
  const mutation = useMutation<any, AxiosError, LogoutInput>({
    mutationFn: (refresh: LogoutInput) => signOutApi(refresh),

    onSuccess: () => {
      dispatch(clearUser());
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      persistor.purge();

      dispatch(setNotification({ message: 'با موفقیت خارج شدید', status: 'success' }));
      window.location.href = '/signin';
    },

    onError: (error: AxiosError) => {
      dispatch(setNotification({ message: 'خطا در خروج از حساب کاربری', status: 'error' }));
      console.error('Error during sign out:', error);
    },
  });

  return mutation;
}
