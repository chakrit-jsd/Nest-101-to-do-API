import { Repository } from 'typeorm';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto, QueryTaskDto } from './dto/request-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { RepositoryProvides } from 'src/constants';

@Injectable()
export class TasksService {
  constructor(
    @Inject(RepositoryProvides.TASK_REPOSITORY)
    private taskRepository: Repository<Task>,
  ) {}
  async create(authorId: number, createTaskDto: CreateTaskDto) {
    try {
      return await this.taskRepository.insert({
        title: createTaskDto.title,
        description: createTaskDto.description,
        author: { id: authorId },
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findAll(query: QueryTaskDto, authorId: number) {
    const cal = (query.page - 1) * query.limit;
    const skip = cal < 0 ? 0 : cal;
    try {
      return await this.taskRepository.find({
        relations: { author: true },
        relationLoadStrategy: 'query',
        where: { status: query.status, author: { id: authorId } },
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          author: { id: true, username: true, role: true },
        },
        skip: skip,
        take: query.limit,
        order: { updatedAt: query.orderby },
      });
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.taskRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, status: TaskStatus) {
    try {
      const task = await this.findOne(id);
      task.status = status;
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new UnprocessableEntityException('Update Task Fail.');
    }
  }

  async remove(id: number) {
    try {
      const task = await this.findOne(id);
      const result = await this.taskRepository.softDelete(task.id);
      if (result.affected === 0) throw new Error();
      return {
        message: 'Delete User Success.',
      };
    } catch (error) {
      throw new UnprocessableEntityException('Delete Task Fail.');
    }
  }
}
