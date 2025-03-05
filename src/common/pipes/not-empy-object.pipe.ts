import {
  PipeTransform,
  BadRequestException,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class NotEmptyObjectPipe implements PipeTransform {
  transform(value: object, metadata: ArgumentMetadata) {
    if (Object.keys(value).length === 0) {
      throw new BadRequestException(
        'El cuerpo de la solicitud no puede estar vacío',
      );
    }
    return value;
  }
}
