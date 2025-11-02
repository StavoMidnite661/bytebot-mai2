import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ComputerActionValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
