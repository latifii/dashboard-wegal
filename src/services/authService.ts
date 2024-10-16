import type { Login, VerifyLogin } from 'src/types/auth.interface';

import http from 'src/configs/axios';

export function verifyApi(data: VerifyLogin) {
  return http.post('/Account/verify', data).then((response) => response.data);
}

export function loginApi(data: Login) {
  return http.post('/Account/signin', data).then((response) => response.data);
}
