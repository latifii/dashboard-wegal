import type { AuthCodeRef } from 'src/components/otp-code/otp-code.types';

import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import OtpCode from 'src/components/otp-code/otp-code';

import { useLogin } from './useLogin';

// import Cookies from 'js-cookie';

export const VerifyView: React.FC = () => {
  const lengthOtp = 6;

  const [verifyCode, setVerifyCode] = useState<string>('');
  const authRef = useRef<AuthCodeRef>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search) || '';
  const mobileNumber = queryParams.get('mobile');

  const { mutate: loginMuate, status, isPending } = useLogin();

  // const token = Cookies.get();
  const handleVerify = () => {
    console.log(verifyCode, mobileNumber);
    if (verifyCode && mobileNumber) {
      loginMuate({ mobileNumber, verifyCode });
      console.log('ok', verifyCode, mobileNumber);
    }
  };
  return (
    <Box gap={2} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
      <Typography variant="h5">کد تایید</Typography>
      <Typography variant="body2">جهت ورود کد تایید شماره {mobileNumber} وارد کنید </Typography>

      <OtpCode
        ref={authRef}
        length={lengthOtp}
        onChange={(value) => {
          console.log(value);
          setVerifyCode(value);
        }}
      />
      <Button fullWidth>ارسال مجدد کد تایید</Button>
      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleVerify}
        disabled={verifyCode.length !== lengthOtp || isPending}
      >
        تایید و ادامه
      </Button>
    </Box>
  );
};
