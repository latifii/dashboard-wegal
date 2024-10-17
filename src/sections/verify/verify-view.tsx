import { useRef } from 'react';
// import OTPInput from 'react-otp-input';

import type { AuthCodeRef } from 'src/components/otp-code/otp-code';

import { Box, Typography } from '@mui/material';

import OtpCode from 'src/components/otp-code/otp-code';

export const VerifyView: React.FC = () => {
  // const [otp, setOtp] = useState('');

  const authRef = useRef<AuthCodeRef>(null);

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">کد تایید</Typography>
        <Typography variant="body2">جهت ورود کد تایید شماره موبایل وارد کنید </Typography>
      </Box>
      {/* <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <TextField {...props} />}
      /> */}
      <OtpCode
        ref={authRef}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </>
  );
};
