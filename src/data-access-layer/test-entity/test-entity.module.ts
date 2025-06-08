import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './entities/test.entity';
import { TestRepositoryService } from './providers/test.repository.service';
import { TestController } from 'src/business-layer/test/controllers/test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  providers: [TestRepositoryService],
  exports: [TestRepositoryService],
  controllers: [TestController],
})
export class TestEntityModule {}
