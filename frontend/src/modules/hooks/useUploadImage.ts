import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImage } from '../api/upload.api';

interface UseUploadImageOptions {
  onSuccess?: (data: { url: string }) => void;
}

export function useUploadImage(options?: UseUploadImageOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadImage,

    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      console.error('Image upload failed:', error);
    },
  });
}