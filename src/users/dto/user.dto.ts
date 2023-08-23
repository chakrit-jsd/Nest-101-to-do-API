import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  username: string;
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
