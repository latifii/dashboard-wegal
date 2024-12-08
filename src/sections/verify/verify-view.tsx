import type { AuthCodeRef } from 'src/components/otp-code/otp-code.types';

import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { fNumberNormal } from 'src/utils/format-number';

import OtpCode from 'src/components/otp-code/otp-code';
import { LinearLoading } from 'src/components/loading';

import { useLogin } from './useLogin';

export const VerifyView: React.FC = () => {
  const lengthOtp = 6;

  const [verifyCode, setVerifyCode] = useState<string>('');
  const authRef = useRef<AuthCodeRef>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search) || '';
  const mobileNumber = queryParams.get('mobile');

  const { mutate: loginMuate, isPending } = useLogin();

  const handleVerify = () => {
    if (verifyCode && mobileNumber) {
      loginMuate({ mobileNumber, verifyCode });
    }
  };

  useEffect(() => {
    if (!mobileNumber) {
      navigate('/signin');
    }
  }, [mobileNumber, navigate]);

  if (!mobileNumber) {
    return <LinearLoading />;
  }

  return (
    <Box gap={2} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
      <Typography variant="h5">کد تایید</Typography>
      <Typography variant="body2">
        کد تایید شماره {fNumberNormal(mobileNumber)} وارد کنید
      </Typography>

      <OtpCode
        ref={authRef}
        length={lengthOtp}
        onChange={(value) => {
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
        {!isPending ? 'تایید و ادامه' : 'در حال ارسال...'}
      </Button>
    </Box>
  );
};
