import { useQuery } from '@tanstack/react-query';

import { getProfileApi } from 'src/services/authService';

export function useProfile() {
  const { data: getProfile, isLoading } = useQuery({
    queryKey: ['accountProfile'],
    queryFn: getProfileApi,
  });

  return { getProfile, isLoading };
}
