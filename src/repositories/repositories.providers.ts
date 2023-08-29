import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { DatabaseProvides, RepositoryProvides } from 'src/constants';
import { Task } from 'src/tasks/entities/task.entity';

export const repositoriesProviders = [
  {
    provide: RepositoryProvides.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DatabaseProvides.DB_MYSQL],
  },
  {
    provide: RepositoryProvides.TASK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: [DatabaseProvides.DB_MYSQL],
  },
];
