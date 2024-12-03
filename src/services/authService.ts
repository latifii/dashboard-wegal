import type { Signin, Verify } from 'src/types/auth.interface';

import http from 'src/configs/axios';

export async function verifyApi(data: Signin): Promise<any> {
  try {
    const response = await http.post('/Account/verify', data);
    return response.data;
  } catch (error) {
    console.error('Error during verification API call:', error);
    throw new Error('Verification request failed');
  }
}

export async function signinApi(data: Verify): Promise<any> {
  try {
    const response = await http.post('/Account/signin', data);
    return response.data;
  } catch (error) {
    console.error('Error during login API call:', error);
    throw error;
  }
}
