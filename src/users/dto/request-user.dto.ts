import { UserRole } from '../entities/user.entity';
import { IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsEnum(UserRole)
  role: UserRole;
}
