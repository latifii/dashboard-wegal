import type { AxiosError } from 'axios';
import type { UseQueryResult } from '@tanstack/react-query';
import type { UserInfoAdmin } from 'src/types/admin.interface';

import { useQuery } from '@tanstack/react-query';

import { userInfoApi } from 'src/services/adminService';

export function useGetUsers(params: UserInfoAdmin): UseQueryResult<any, AxiosError> {
  return useQuery<any, AxiosError>({
    queryKey: ['userInfos', params],
    queryFn: () => userInfoApi(params),

    // onError: (error: AxiosError) => {
    //     // می‌توانید خطا را مدیریت کنید یا نمایش دهید
    //     console.error('Error fetching user info:', error.response?.data);
    //   },
  });
}
