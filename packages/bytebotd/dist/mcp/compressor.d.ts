interface CompressionOptions {
    targetSizeKB?: number;
    initialQuality?: number;
    minQuality?: number;
    format?: 'png' | 'jpeg' | 'webp';
    maxIterations?: number;
}
interface CompressionResult {
    base64: string;
    sizeBytes: number;
    sizeKB: number;
    sizeMB: number;
    quality: number;
    format: string;
    iterations: number;
}
declare class Base64ImageCompressor {
    static compressToSize(base64String: string, options?: CompressionOptions): Promise<CompressionResult>;
    private static compressBuffer;
    static compressWithResize(base64String: string, options?: CompressionOptions & {
        maxWidth?: number;
        maxHeight?: number;
    }): Promise<CompressionResult>;
    static getBase64SizeInfo(base64String: string): {
        bytes: number;
        kb: number;
        mb: number;
        formatted: string;
    };
}
export declare function compressPngBase64Under1MB(base64String: string): Promise<string>;
export { Base64ImageCompressor, CompressionOptions, CompressionResult };
