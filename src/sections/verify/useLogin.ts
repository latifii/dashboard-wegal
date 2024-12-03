import type { Verify } from 'src/types/auth.interface';
import type { UseMutationResult } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { verifyApi } from 'src/services/authService';
import { setNotification } from 'src/store/slices/notificationSlice';

export function useLogin(): UseMutationResult<any, Error, Verify> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutation<any, Error, Verify>({
    mutationFn: (data: Verify) => verifyApi(data),
    onSuccess: (data) => {
      dispatch(setNotification({ message: 'ورود با موفقیت انجام شد', status: 'success' }));
      console.log(data);
      if (data.succeeded) {
        navigate('/');
        console.log('success');
      }
    },
    onError: (error: Error) => {
      dispatch(setNotification({ message: 'کد صیحیح نمی‌باشد', status: 'error' }));
      console.error('Error in login process:', error);
    },
  });

  return mutation;
}
