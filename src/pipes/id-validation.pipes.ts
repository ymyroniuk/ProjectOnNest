import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ID_NOT_FOUND_ERROR } from './id-validation.constants';
import { Types } from 'mongoose';

export class IdValidationPipe implements PipeTransform{
    transform(value: string, metadata: ArgumentMetadata) {
        if(metadata.type != 'param') {
            return value;
        }
        if(!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(ID_NOT_FOUND_ERROR);
        }
        return value;
    }
}