import type { MouseEvent } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function ProfileView() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1 } }} noValidate autoComplete="off">
      <div>
        <TextField required id="outlined-required" label="نام" />
        <TextField required id="outlined-required" label="نام خانوادگی" />
        <TextField required id="outlined-required" label="نام کاربری" />

        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">رمز عبور</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
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
            label="Password"
          />
        </FormControl>
      </div>
    </Box>
  );
}
