import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { DatabaseProvides, RepositoryProvides } from 'src/constant';

export const repositoriesProviders = [
  {
    provide: RepositoryProvides.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DatabaseProvides.DB_MYSQL],
  },
];
