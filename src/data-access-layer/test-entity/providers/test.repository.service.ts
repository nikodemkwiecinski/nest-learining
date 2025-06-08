import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from '../entities/test.entity';
import { Repository } from 'typeorm';

export interface CreateTestDto {
  name: string;
}

export interface UpdateTestDto {
  name?: string;
}

@Injectable()
export class TestRepositoryService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {}

  async findAll(): Promise<TestEntity[]> {
    return this.testRepository.find();
  }
  async findOne(id: string): Promise<TestEntity | null> {
    return this.testRepository.findOneBy({ id });
  }
  async create(testEntity: CreateTestDto): Promise<TestEntity> {
    const newTestEntity = this.testRepository.create({
      id: crypto.randomUUID(),
      ...testEntity,
    });
    return this.testRepository.save(newTestEntity);
  }
  async update(id: string, testEntity: UpdateTestDto): Promise<TestEntity | null> {
    const existingEntity = await this.testRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }
    Object.assign(existingEntity, testEntity);
    return this.testRepository.save(existingEntity);
  }
  async delete(id: string): Promise<void> {
    const existingEntity = await this.testRepository.findOneBy({ id });
    if (existingEntity) {
      await this.testRepository.remove(existingEntity);
    }
  }
}
