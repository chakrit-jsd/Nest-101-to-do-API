import { Global, Module } from '@nestjs/common';
import { repositoriesProviders } from './repositories.providers';

@Global()
@Module({
  providers: [...repositoriesProviders],
  exports: [...repositoriesProviders],
})
export class RepositoryModule {}
