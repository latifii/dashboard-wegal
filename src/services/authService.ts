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
    console.log('Login response:', response);
    const { accessToken, refreshToken } = response.data.data;

    if (accessToken) {
      localStorage.setItem('access', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refresh', refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error('Error during login API call:', error);
    throw error;
  }
}

export async function refreshTokenApi(refreshToken: string): Promise<any> {
  try {
    const response = await http.post(
      `/Account/refresh?refreshToken=${refreshToken}`,
      {},
      {
        headers: {
          accept: 'text/plain',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error during refresh token API call:', error);
    throw new Error('Refresh token request failed');
  }
}

export async function getProfileApi(): Promise<any> {
  try {
    const response = await http.get('/Account/profile');

    return response.data;
  } catch (error) {
    console.error('Error during profile API call:', error);
    throw new Error('Profile request failed');
  }
}
