import { User } from '../entities/user.entity';

export class ResponseUserDto extends User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor({ password, updatedAt, deletedAt, ...partial }: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
