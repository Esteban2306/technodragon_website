import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private service;
    constructor(service: CloudinaryService);
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
}
