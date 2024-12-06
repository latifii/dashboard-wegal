import type { Verify } from 'src/types/auth.interface';
import type { UseMutationResult } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { signinApi } from 'src/services/authService';
import { setNotification } from 'src/store/slices/notificationSlice';

export function useLogin(): UseMutationResult<any, Error, Verify> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutation<any, Error, Verify>({
    mutationFn: (data: Verify) => signinApi(data),
    onSuccess: (data) => {
      dispatch(setNotification({ message: 'ورود با موفقیت انجام شد', status: 'success' }));
      console.log('login', data);
      if (data.statusCode === 200) {
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
