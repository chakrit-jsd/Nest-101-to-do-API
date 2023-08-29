import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryOrderBy } from './request-task.dto';

@Injectable()
export class ParseQueryToObj implements PipeTransform {
  transform(value: object, metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value;
    }

    if (value['orderby'] === 'date-desc') {
      value['orderby'] = QueryOrderBy.DateDecs;
    } else {
      value['orderby'] = QueryOrderBy.Date;
    }
    return plainToInstance(metadata.metatype, value);
  }
}
