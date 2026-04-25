import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File, folder: string) {
    if (!file?.buffer) {
      throw new InternalServerErrorException('Invalid file buffer');
    }

    return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result) {
            return reject(
              new InternalServerErrorException('Cloudinary upload failed'),
            );
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      stream.end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    if (!publicId) {
      throw new InternalServerErrorException('PublicId is required');
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
      });

      if (result.result !== 'ok' && result.result !== 'not found') {
        throw new Error(`Unexpected Cloudinary response: ${result.result}`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting image from Cloudinary',
      );
    }
  }

  async deleteImages(publicIds: string[]): Promise<void> {
    if (!publicIds || publicIds.length === 0) return;

    try {
      await Promise.all(
        publicIds.map((id) => cloudinary.uploader.destroy(id)),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting multiple images from Cloudinary',
      );
    }
  }

  extractPublicId(url: string): string | null {
    try {
      const parts = url.split('/');
      const file = parts.pop();
      if (!file) return null;

      return file.split('.')[0];
    } catch {
      return null;
    }
  }
}