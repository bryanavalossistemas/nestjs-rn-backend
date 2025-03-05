import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPositivePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const id = Number(value);
    if (isNaN(id) || id < 1 || !Number.isInteger(id)) {
      throw new BadRequestException('El ID debe ser un número entero positivo');
    }
    return id;
  }
}
