"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadImage(file, folder) {
        if (!file?.buffer) {
            throw new common_1.InternalServerErrorException('Invalid file buffer');
        }
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                resource_type: 'image',
            }, (error, result) => {
                if (error || !result) {
                    return reject(new common_1.InternalServerErrorException('Cloudinary upload failed'));
                }
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            });
            stream.end(file.buffer);
        });
    }
    async deleteImage(publicId) {
        if (!publicId) {
            throw new common_1.InternalServerErrorException('PublicId is required');
        }
        try {
            const result = await cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: 'image',
            });
            if (result.result !== 'ok' && result.result !== 'not found') {
                throw new Error(`Unexpected Cloudinary response: ${result.result}`);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting image from Cloudinary');
        }
    }
    async deleteImages(publicIds) {
        if (!publicIds || publicIds.length === 0)
            return;
        try {
            await Promise.all(publicIds.map((id) => cloudinary_1.v2.uploader.destroy(id)));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting multiple images from Cloudinary');
        }
    }
    extractPublicId(url) {
        try {
            const parts = url.split('/');
            const file = parts.pop();
            if (!file)
                return null;
            return file.split('.')[0];
        }
        catch {
            return null;
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map