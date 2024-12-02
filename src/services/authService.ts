import type { Login, VerifyLogin } from 'src/types/auth.interface';

import http from 'src/configs/axios';

export async function verifyApi(data: VerifyLogin): Promise<any> {
  const response = await http.post('/Account/verify', data);
  return response.data;
}

export function loginApi(data: Login) {
  return http.post('/Account/signin', data).then((response) => response.data);
}
