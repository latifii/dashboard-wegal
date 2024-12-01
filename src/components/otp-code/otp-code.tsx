import type { FocusEvent, ChangeEvent, KeyboardEvent } from 'react';

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import { Box, TextField } from '@mui/material';

import type { AuthCodeRef, AuthCodeProps, AuthInputProps } from './otp-code.types';

const OtpCode = forwardRef<AuthCodeRef, AuthCodeProps>(
  ({ autoFocus = true, isDisabled, length = 5, onChange }, ref) => {
    if (length < 1) {
      throw new Error('.تعداد ارقام باید بزرگ‌‌تر از صفر باشد');
    }

    const inputsRef = useRef<Array<HTMLInputElement>>([]);

    const inputProps: AuthInputProps = {
      min: '0',
      max: '9',
      pattern: '[0-9]{1}',
    };

    useEffect(() => {
      if (autoFocus) {
        inputsRef.current[0].focus();
      }
    }, [autoFocus]);

    const sendResult = () => {
      const result = inputsRef.current.map((input) => input.value).join('');
      onChange(result);
    };

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedValue = e.clipboardData.getData('Text');
      const targetIndex = inputsRef.current.indexOf(e.target as HTMLInputElement);

      e.preventDefault();

      let index = targetIndex;
      for (let i = 0; i < pastedValue.length; i += 1) {
        if (index < inputsRef.current.length) {
          inputsRef.current[index].value = pastedValue[i];
          index += 1;
        }
      }
      sendResult();
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;

      const targetIndex = inputsRef.current.indexOf(e.target as HTMLInputElement);

      if (value.match(inputProps.pattern)) {
        if (targetIndex < inputsRef.current.length - 1) {
          const nextInput = inputsRef.current[targetIndex + 1];
          nextInput.focus();
        }
      } else {
        e.target.value = '';
      }
      sendResult();
    };

    const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      const targetIndex = inputsRef.current.indexOf(e.target as HTMLInputElement);

      if (key === 'Backspace') {
        e.preventDefault();

        const target = e.target as HTMLInputElement;

        if (target.value === '' && targetIndex > 0) {
          const previousInput = inputsRef.current[targetIndex - 1];
          previousInput.value = '';
          previousInput.focus();
        } else {
          target.value = '';
        }

        sendResult();
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputsRef.current) {
          inputsRef.current[0].focus();
        }
      },
      clear: () => {
        if (inputsRef.current) {
          for (let i = 0; i < inputsRef.current.length; i += 1) {
            inputsRef.current[i].value = '';
          }

          inputsRef.current[0].focus();
        }

        sendResult();
      },
    }));

    const inputs = [];
    for (let i = 0; i < length; i += 1) {
      inputs.push(
        <TextField
          key={`input-${i + 1}`}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: 'center',
            },
          }}
          disabled={isDisabled}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          onPaste={handleOnPaste}
          inputRef={(element: HTMLInputElement) => {
            inputsRef.current[i] = element;
          }}
          variant="outlined"
          size="small"
          sx={{ width: '4rem' }}
        />
      );
    }

    return (
      <Box display="flex" gap={2} justifyContent="center" flexDirection="row-reverse">
        {inputs}
      </Box>
    );
  }
);

export default OtpCode;
