import type { AxiosError } from 'axios';
import type { UseQueryResult } from '@tanstack/react-query';
import type { UserInfoAdmin } from 'src/types/admin.interface';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { typeIdRoles } from 'src/utils/variables';

import { userInfoApi } from 'src/services/adminService';

export function useGetUsers(params: UserInfoAdmin): UseQueryResult<any, AxiosError> {
  const [searchParams] = useSearchParams();

  const pageNumber = searchParams.get('pageNumber') || '1';
  const pageSize = searchParams.get('pageSize') || '10';
  const phoneNumber = searchParams.get('phoneNumber') || '';
  const userId = searchParams.get('userId') || '';

  const filterRole = searchParams.get('role') || '';
  console.log(filterRole);

  let userTypeId: string = '';
  if (filterRole === 'vegalAdmin') userTypeId = typeIdRoles.VegalAdmin;
  if (filterRole === 'vendor') userTypeId = typeIdRoles.Vendor;

  const queryResult = useQuery<any, AxiosError>({
    queryKey: ['userInfos', { pageNumber, pageSize, phoneNumber, userId, filterRole }],
    queryFn: () =>
      userInfoApi({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        phoneNumber,
        userId,
        userTypeId,
      }),
    refetchOnWindowFocus: false,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return queryResult;
}
