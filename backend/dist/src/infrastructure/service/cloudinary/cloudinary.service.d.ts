export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File, folder: string): Promise<{
        url: string;
        publicId: string;
    }>;
    deleteImage(publicId: string): Promise<void>;
    deleteImages(publicIds: string[]): Promise<void>;
    extractPublicId(url: string): string | null;
}
