import { DatabaseProvides } from 'src/constant';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DatabaseProvides.DB_MYSQL,
    useFactory: async () => {
      const DB = process.env;
      const dataSource = new DataSource({
        type: 'mysql',
        host: DB.DB_HOST,
        port: +DB.DB_PORT,
        username: DB.DB_USERNAME,
        password: DB.DB_PASSWORD,
        database: DB.DB_DBBASENAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: DB.DB_SYNCHRONIZE === 'true',
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
