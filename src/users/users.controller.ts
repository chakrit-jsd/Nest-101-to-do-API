import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/request-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return (await this.usersService.findAll()).map(
      (item) => new ResponseUserDto(item),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ResponseUserDto(await this.usersService.findOne(+id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new ResponseUserDto(
      await this.usersService.update(+id, updateUserDto),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
