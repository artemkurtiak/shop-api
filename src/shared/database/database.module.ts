import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import dataSource from 'typeorm.datasource';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options)],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
