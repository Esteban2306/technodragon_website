import { httpClient } from "@/src/core/api/http/http-client";
import { UploadImageInput, UploadImageResponse } from "@/src/shared/types/uploadImage.types";

export async function uploadImage(
  input: UploadImageInput
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append('file', input.file);

  return httpClient.request<UploadImageResponse>(
    '/uploads/image',
    'POST',
    formData,
    {
      headers: {}, // 🔥 necesario para multipart
    }
  );
}