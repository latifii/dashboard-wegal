import type { UserInfoAdmin } from 'src/types/admin.interface';

import http from 'src/configs/axios';

export async function userInfoApi({
  pageNumber,
  pageSize,
  phoneNumber,
  userId,
  userTypeId,
}: UserInfoAdmin): Promise<any> {
  try {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (phoneNumber) params.append('phoneNumber', phoneNumber);
    if (userId) params.append('userId', userId);
    if (userTypeId) params.append('userTypeId', userTypeId);

    const response = await http.get(`/Admin/user-infos?${params.toString()}`);

    return response.data;
  } catch (error) {
    console.error('Error during user-infos API call:', error);
    throw new Error('Sign-out request failed');
  }
}
