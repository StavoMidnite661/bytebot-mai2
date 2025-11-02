"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64ImageCompressor = void 0;
exports.compressPngBase64Under1MB = compressPngBase64Under1MB;
const sharp = require("sharp");
class Base64ImageCompressor {
    static async compressToSize(base64String, options = {}) {
        const { targetSizeKB = 1024, initialQuality = 95, minQuality = 10, format = 'png', maxIterations = 10, } = options;
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const inputBuffer = Buffer.from(base64Data, 'base64');
        let quality = initialQuality;
        let outputBuffer;
        let iterations = 0;
        let low = minQuality;
        let high = initialQuality;
        let bestResult = null;
        while (low <= high && iterations < maxIterations) {
            quality = Math.floor((low + high) / 2);
            outputBuffer = await this.compressBuffer(inputBuffer, quality, format);
            const sizeKB = outputBuffer.length / 1024;
            if (sizeKB <= targetSizeKB) {
                bestResult = { buffer: outputBuffer, quality };
                low = quality + 1;
            }
            else {
                high = quality - 1;
            }
            iterations++;
        }
        if (!bestResult) {
            outputBuffer = await this.compressBuffer(inputBuffer, minQuality, format);
            quality = minQuality;
        }
        else {
            outputBuffer = bestResult.buffer;
            quality = bestResult.quality;
        }
        const outputBase64 = outputBuffer.toString('base64');
        const sizeBytes = outputBuffer.length;
        return {
            base64: outputBase64,
            sizeBytes,
            sizeKB: sizeBytes / 1024,
            sizeMB: sizeBytes / (1024 * 1024),
            quality,
            format,
            iterations,
        };
    }
    static async compressBuffer(inputBuffer, quality, format) {
        const sharpInstance = sharp(inputBuffer);
        switch (format) {
            case 'png':
                return sharpInstance
                    .png({
                    quality,
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                    palette: true,
                })
                    .toBuffer();
            case 'jpeg':
                return sharpInstance
                    .jpeg({
                    quality,
                    progressive: true,
                    mozjpeg: true,
                    optimizeScans: true,
                })
                    .toBuffer();
            case 'webp':
                return sharpInstance
                    .webp({
                    quality,
                    alphaQuality: quality,
                    lossless: false,
                    nearLossless: false,
                    smartSubsample: true,
                })
                    .toBuffer();
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }
    static async compressWithResize(base64String, options = {}) {
        const { targetSizeKB = 1024, maxWidth = 2048, maxHeight = 2048, ...compressionOptions } = options;
        let result = await this.compressToSize(base64String, compressionOptions);
        if (result.sizeKB > targetSizeKB) {
            const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
            const inputBuffer = Buffer.from(base64Data, 'base64');
            const metadata = await sharp(inputBuffer).metadata();
            const originalWidth = metadata.width || maxWidth;
            const originalHeight = metadata.height || maxHeight;
            let scale = 0.9;
            while (result.sizeKB > targetSizeKB && scale > 0.3) {
                const newWidth = Math.floor(originalWidth * scale);
                const newHeight = Math.floor(originalHeight * scale);
                const resizedBuffer = await sharp(inputBuffer)
                    .resize(newWidth, newHeight, {
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                    .toBuffer();
                const resizedBase64 = resizedBuffer.toString('base64');
                result = await this.compressToSize(resizedBase64, compressionOptions);
                scale -= 0.1;
            }
        }
        return result;
    }
    static getBase64SizeInfo(base64String) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const bytes = Buffer.from(base64Data, 'base64').length;
        const kb = bytes / 1024;
        const mb = bytes / (1024 * 1024);
        let formatted;
        if (mb >= 1) {
            formatted = `${mb.toFixed(2)} MB`;
        }
        else if (kb >= 1) {
            formatted = `${kb.toFixed(2)} KB`;
        }
        else {
            formatted = `${bytes} bytes`;
        }
        return { bytes, kb, mb, formatted };
    }
}
exports.Base64ImageCompressor = Base64ImageCompressor;
async function compressPngBase64Under1MB(base64String) {
    const result = await Base64ImageCompressor.compressToSize(base64String, {
        targetSizeKB: 1024,
        format: 'png',
        initialQuality: 95,
        minQuality: 10,
    });
    return result.base64;
}
//# sourceMappingURL=compressor.js.map