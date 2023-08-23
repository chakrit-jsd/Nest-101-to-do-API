import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { DatabaseProvides, RepositoryProvides } from 'src/constant';

export const userProviders = [
  {
    provide: RepositoryProvides.users,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DatabaseProvides.mysql],
  },
];
