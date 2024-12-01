import type { AuthCodeRef } from 'src/components/otp-code/otp-code.types';

import { useRef } from 'react';

import { Box, Button, Typography } from '@mui/material';

import OtpCode from 'src/components/otp-code/otp-code';

export const VerifyView: React.FC = () => {
  const authRef = useRef<AuthCodeRef>(null);

  return (
    <Box gap={3} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
      <Typography variant="h5">کد تایید</Typography>
      <Typography variant="body2">جهت ورود کد تایید شماره موبایل وارد کنید </Typography>

      <OtpCode
        ref={authRef}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <Button fullWidth>ارسال مجدد کد تایید</Button>
      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        // disabled={isPending}
      >
        تایید و ادامه
      </Button>
    </Box>
  );
};
