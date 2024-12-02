import type { SubmitHandler } from 'react-hook-form';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// import { useRouter } from 'src/routes/hooks';

import { useDispatch } from 'react-redux';

// import { setNotification } from 'src/store/slices/notificationSlice';
import { setNotification } from 'src/store/slices/notificationSlice';

import Modal from 'src/components/modal/modal';

import { useVerify } from './useVerify';

import type { SiginInForm } from './sign-in.types';
// ----------------------------------------------------------------------

export function SignInView() {
  // const router = useRouter();
  const dispatch = useDispatch();
  const { mutate: verifyMutate, isPending } = useVerify();
  const sendPostRequest = async () => {
    try {
      const response = await fetch('https://warranty.mattresswegal.ir/Account/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: '09377512323', // داده‌های مورد نیاز درخواست شما
        }),
        // mode: 'no-cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // اگر پاسخ JSON باشد
      console.log('Response data:', data); // نمایش داده‌های پاسخ
    } catch (error) {
      console.error('Error in fetch request:', error.message);
      dispatch(setNotification({ message: error.message, status: 'error' }));
    }
  };

  // فراخوانی تابع برای ارسال درخواست

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SiginInForm>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.replace(/[^0-9]/g, '');
    setValue('mobile', value);
    clearErrors('mobile');
    if (value.length === 0) {
      setError('mobile', { type: 'manual', message: 'شماره الزامی است' });
    } else if (value.length < 11) {
      setError('mobile', { type: 'manual', message: 'حداقل 11 شماره باید وارد شود' });
    }
  };

  const handleSignIn: SubmitHandler<SiginInForm> = (data) => {
    console.log(data.mobile);
    sendPostRequest();
    // verifyMutate({ mobileNumber: data.mobile });
    // router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Box gap={3} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">ورود | ثبت نام</Typography>
        <Typography variant="body2">
          جهت ورود یا ثبت نام به داشبورد کاربری شماره موبایل وارد کنید{' '}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          name="mobile"
          label="شماره موبایل"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          error={!!errors.mobile}
          helperText={errors.mobile ? errors.mobile.message : ''}
          inputProps={{
            pattern: '[0-9]*',
            inputMode: 'numeric',
            maxLength: 11,
          }}
          inputRef={
            register('mobile', {
              required: 'شماره موبایل الزامی است',
              minLength: { value: 11, message: 'شماره موبایل نمی‌تواند کمتر از 11 رقم باشد' },
              pattern: { value: /^[0-9]+$/, message: 'فقط اعداد مجاز هستند' },
            }).ref
          }
          onInput={handleInputChange}
        />

        <Modal>
          <Modal.Open opens="exa">
            <Button>اضافه</Button>
          </Modal.Open>

          <Modal.Window title="مودال اول" name="exa">
            <div>This is </div>
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="dell">
            <Button>حذف</Button>
          </Modal.Open>

          <Modal.Window title="مودال دوم" name="dell">
            <div>حذفش کن </div>
          </Modal.Window>
        </Modal>
        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          // disabled={isPending}
        >
          تایید و دریافت کد
        </Button>
      </Box>
    </form>
  );
}
