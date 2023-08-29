import {
  Injectable,
  Inject,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/request-user.dto';
import { User } from './entities/user.entity';
import { RepositoryProvides } from 'src/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryProvides.USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { BC_SALT } = process.env;
    const user = new User();
    user.username = createUserDto.username;
    user.password = await bcrypt.hash(createUserDto.password, +BC_SALT);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new UnprocessableEntityException('Create User Fail.');
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  async findOne(param: number | string) {
    try {
      return await this.userRepository.findOneByOrFail(
        typeof param === 'number' ? { id: param } : { username: param },
      );
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.role = updateUserDto.role;
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new UnprocessableEntityException('Update User Fail.');
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    try {
      const result = await this.userRepository.softDelete(user.id);
      if (result.affected === 0) throw new Error();
      return {
        message: 'Delete User Success.',
      };
    } catch (error) {
      throw new UnprocessableEntityException('Delete User Fail.');
    }
  }
}
