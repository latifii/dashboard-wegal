import type { AxiosError } from 'axios';
import type { UpdateProfile } from 'src/types/user.interface';

import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

import { setUser } from 'src/store/slices/userSlice';
import { setNotification } from 'src/store/slices/notificationSlice';
import { getProfileApi, updateProfileApi } from 'src/services/authService';

export function useUpdateProfile() {
  const dispatch = useDispatch();
  // const phoneNumber =
  const mutation = useMutation<any, AxiosError, UpdateProfile>({
    mutationFn: (data: UpdateProfile) => updateProfileApi(data),

    onSuccess: async (data) => {
      dispatch(setNotification({ message: 'پروفایل با موفقیت به‌روزرسانی شد', status: 'success' }));

      try {
        const updateProfile = await getProfileApi();
        dispatch(
          setUser({
            firstName: updateProfile.data.firstName,
            lastName: updateProfile.data.lastName,
            userName: updateProfile.data.userName,
          })
        );
      } catch (error) {
        console.error('خطا در دریافت پروفایل به روز شده:', error);
      }
    },

    onError: (error: AxiosError) => {
      dispatch(setNotification({ message: error.message, status: 'error' }));
    },
  });

  return mutation;
}
