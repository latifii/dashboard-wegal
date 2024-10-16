import type { VerifyLogin } from 'src/types/auth.interface';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { verifyApi } from 'src/services/authService';

export function useVerify(): UseMutationResult<VerifyLogin> {
  const { mutate: verifyMutate, isLoading } = useMutation({
    mutationFn: (data: VerifyLogin) => verifyApi(data),
  });

  return { verifyMutate, isLoading };
}
