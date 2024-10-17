import type { VerifyLogin } from 'src/types/auth.interface';
import type { UseMutationResult } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

import { verifyApi } from 'src/services/authService';
import { setNotification } from 'src/store/slices/notificationSlice';

export function useVerify(): UseMutationResult<any, Error, VerifyLogin> {
  const dispatch = useDispatch();
  const mutation = useMutation<any, Error, VerifyLogin>({
    mutationFn: (data: VerifyLogin) => verifyApi(data),
    onSuccess: (data) => {
      dispatch(setNotification({ message: 'کد تایید با موفقیت ارسال شد', status: 'success' }));
    },
    onError: (error: Error) => {
      dispatch(setNotification({ message: 'خطا در ارسال کد تایید', status: 'error' }));
      console.error('Error in verify process:', error);
    },
  });

  return mutation;
}
