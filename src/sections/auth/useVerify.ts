import type { Signin } from 'src/types/auth.interface';
import type { UseMutationResult } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { verifyApi } from 'src/services/authService';
import { setNotification } from 'src/store/slices/notificationSlice';

export function useVerify(): UseMutationResult<any, Error, Signin> {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation<any, Error, Signin>({
    mutationFn: (data: Signin) => verifyApi(data),
    onSuccess: (data, variables) => {
      dispatch(setNotification({ message: 'کد تایید با موفقیت ارسال شد', status: 'success' }));
      console.log('verify', data);
      navigate(`/verify?mobile=${variables.mobileNumber}`);
    },
    onError: (error: Error) => {
      dispatch(setNotification({ message: 'خطا در ارسال کد تایید', status: 'error' }));
      console.error('Error in verify process:', error);
    },
  });

  return mutation;
}
