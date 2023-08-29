import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  QueryTaskDto,
  UpdateTaskDto,
} from './dto/request-task.dto';
import { Request } from 'express';
import { AuthGuard, RoleAdminGuard } from 'src/auth/auth.guard';
import { ParseQueryToObj } from './dto/request-query.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Req() req: Request, @Body() createTaskDto: CreateTaskDto) {
    const authorId = req['user']?.id as number;
    return await this.tasksService.create(authorId, createTaskDto);
  }

  @Get('/query?')
  findAll(
    @Req() req: Request,
    @Query(new ParseQueryToObj()) query?: QueryTaskDto,
  ) {
    let authorId: number = null;
    if (req['user']?.role === 'USER') {
      authorId = req['user'].id;
    }
    return this.tasksService.findAll(query, authorId);
  }

  @Patch(':id')
  @UseGuards(RoleAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
