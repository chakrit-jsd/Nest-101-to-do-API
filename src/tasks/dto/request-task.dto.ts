import { TaskStatus } from '../entities/task.entity';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export enum QueryOrderBy {
  Date = 1,
  DateDecs = -1,
}

export class QueryTaskDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number = 10;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus = null;

  @IsOptional()
  orderby: QueryOrderBy = QueryOrderBy.Date;
}
