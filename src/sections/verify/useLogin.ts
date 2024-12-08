import type { AxiosError } from 'axios';
import type { Verify } from 'src/types/auth.interface';
import type { UseMutationResult } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { setUser } from 'src/store/slices/userSlice';
import { signinApi, getProfileApi } from 'src/services/authService';
import { setNotification } from 'src/store/slices/notificationSlice';

export function useLogin(): UseMutationResult<any, AxiosError, Verify> {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation<any, AxiosError, Verify>({
    mutationFn: (data: Verify) => signinApi(data),

    onSuccess: async (data) => {
      dispatch(setNotification({ message: 'ورود با موفقیت انجام شد', status: 'success' }));

      if (data.statusCode === 200) {
        try {
          const profileData = await getProfileApi();
          console.log('profileData', profileData);

          dispatch(
            setUser({
              phoneNumber: profileData.data.phoneNumber,
              firstName: profileData.data.firstName,
              lastName: profileData.data.lastName,
              userName: profileData.data.userName,
            })
          );
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }

        navigate('/');
      }
    },

    onError: (error: AxiosError) => {
      if (error?.status === 400) {
        dispatch(setNotification({ message: 'کد تایید صحیح نمی‌باشد', status: 'error' }));
      } else {
        dispatch(
          setNotification({ message: 'خطای ناشناخته، لطفاً دوباره تلاش کنید', status: 'error' })
        );
      }
    },
  });

  return mutation;
}
