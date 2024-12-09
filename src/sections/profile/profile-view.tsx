import type { RootState } from 'src/store/store';
import type { SubmitHandler } from 'react-hook-form';
import type { UpdateProfile } from 'src/types/user.interface';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { useUpdateProfile } from './useUpdateProfile';

export default function ProfileView() {
  // const dispatch = useDispatch();
  const { mutate: mutateUpdateProfile, isPending } = useUpdateProfile();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { firstName, lastName, userName } = useSelector((state: RootState) => state.user);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfile>({
    defaultValues: {
      userName: userName ?? '',
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      password: '', // Password field should also have a default value
    },
  });

  useEffect(() => {
    setValue('userName', userName ?? '');
    setValue('firstName', firstName ?? '');
    setValue('lastName', lastName ?? '');
  }, [userName, firstName, lastName, setValue]);

  const onSubmit: SubmitHandler<UpdateProfile> = (data) => {
    console.log(data);
    mutateUpdateProfile(data);
  };
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          ویرایش پروفایل
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          '& .MuiFormControl-root': { width: 'calc(50% - 8px)' },
          '@media (max-width: 37.5rem)': {
            '& .MuiFormControl-root': { width: '100%' },
          },
          backgroundColor: 'white',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9e9e9',
          borderRadius: '8px',
          padding: 5,
          width: '50%',
          '@media (max-width: 37rem)': {
            width: '90%',
          },
          margin: '0 auto',
        }}
        noValidate
        autoComplete="off"
      >
        {/* First Name */}
        <Controller
          name="firstName"
          control={control}
          defaultValue={firstName ?? ''}
          rules={{
            required: 'لطفا نام را وارد کنید',
            pattern: {
              value: /^[A-Za-z\u0600-\u06FF\s]+$/,
              message: 'فقط حروف مجاز است',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ''}
              label="نام "
              required
            />
          )}
        />

        {/* Last Name */}
        <Controller
          name="lastName"
          control={control}
          defaultValue={lastName ?? ''}
          rules={{
            required: 'لطفا نام خانوادگی را وارد کنید',
            pattern: {
              value: /^[A-Za-z\u0600-\u06FF\s]+$/,
              message: 'فقط حروف مجاز است',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ''}
              label="نام خانوادگی"
              required
            />
          )}
        />

        {/* User Name */}
        <Controller
          name="userName"
          control={control}
          defaultValue={userName ?? ''}
          rules={{
            required: 'لطفا نام کاربری را وارد کنید',
            minLength: {
              value: 3,
              message: 'نام کاربری باید حداقل 3 کاراکتر باشد',
            },
            maxLength: {
              value: 12,
              message: 'نام کاربری نباید بیشتر از 12 کاراکتر باشد',
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'نام کاربری باید فقط شامل حروف انگلیسی باشد',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.userName}
              helperText={errors.userName ? errors.userName.message : ''}
              label="نام کاربری"
              required
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: 'لطفا رمز عبور را وارد کنید',
            minLength: {
              value: 5,
              message: 'رمز عبور باید حداقل 5 کاراکتر باشد',
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])|(?=.*\d)|(?=.*[!@#$%^&*(),.?":{}|<>])/,
              message: 'رمز عبور باید شامل حروف یا اعداد یا علائم اختصاری باشد',
            },
          }}
          render={({ field }) => (
            <FormControl variant="outlined" required error={!!errors.password}>
              <InputLabel htmlFor="outlined-adornment-password">رمز عبور</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                {...field}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Iconify
                          icon="material-symbols:visibility-off-outline"
                          width="24"
                          height="24"
                        />
                      ) : (
                        <Iconify icon="material-symbols:visibility" width="24" height="24" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="رمز عبور"
              />
              {errors.password && (
                <Typography variant="caption" color="error">
                  {errors.password.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'در حال ارسال' : 'ویرایش'}
        </Button>
      </Box>
    </DashboardContent>
  );
}
