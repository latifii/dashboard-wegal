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
    const { accessToken } = response.data.data;
    if (accessToken) {
      localStorage.setItem('authToken', accessToken);
    }

    return response.data;
  } catch (error) {
    console.error('Error during login API call:', error);
    throw error;
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
// import type { Signin, Verify } from 'src/types/auth.interface';

// export async function verifyApi(data: Signin): Promise<any> {
//   try {
//     const response = await fetch('https://warranty.mattresswegal.ir/Account/verify', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//       // credentials: 'include',
//     });

//     if (!response.ok) {
//       throw new Error('Verification request failed');
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Error during verification API call:', error);
//     throw new Error('Verification request failed');
//   }
// }

// export async function signinApi(data: Verify): Promise<any> {
//   try {
//     const response = await fetch('https://warranty.mattresswegal.ir/Account/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//       // credentials: 'include',
//     });

//     if (!response.ok) {
//       throw new Error('Login request failed');
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Error during login API call:', error.message);
//     throw error;
//   }
// }

// export async function getProfileApi(): Promise<any> {
//   try {
//     const response = await fetch('https://warranty.mattresswegal.ir/Account/profile', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // credentials: 'include',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch profile data');
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Error during profile API call:', error.message);
//     throw error;
//   }
// }
