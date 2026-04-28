'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { authKeys } from './auth.keys';

export const useMe = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.me,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    retry: 1,

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user);
    },

    onError: () => {
      queryClient.removeQueries({ queryKey: authKeys.me() });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null);
      queryClient.cancelQueries({ queryKey: authKeys.me() });
    },
  });
};

export const useRefresh = () => {
  return useMutation({
    mutationFn: authApi.refresh,
  });
};