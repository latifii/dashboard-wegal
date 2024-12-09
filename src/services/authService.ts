import type { Signin, Verify } from 'src/types/auth.interface';

import http from 'src/configs/axios';
import { UpdateProfile } from 'src/types/user.interface';

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
    const response = await http.post(`/Account/refresh?refreshToken=${refreshToken}`);
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

export async function updateProfileApi(data: UpdateProfile): Promise<any> {
  try {
    const response = await http.put('/Account/update-profile', data);
    return response.data;
  } catch (error) {
    console.error('Error during update profile API call:', error.status);
    if (error.status === 400) {
      throw new Error('اطلاعات وارد شده صحیح نیست');
    } else if (error.status === 409) {
      throw new Error('نام کاربری قبلا وارد شده است');
    } else {
      throw new Error('خطای ناشناخته دوباره تلاش کنید');
    }
  }
}
