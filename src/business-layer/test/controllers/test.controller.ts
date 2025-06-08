import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import {
  CreateTestDto,
  TestRepositoryService,
  UpdateTestDto,
} from 'src/data-access-layer/test-entity/providers/test.repository.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestRepositoryService) {}

  @Get('/display-test-entities')
  async displayTestEntities() {
    const testEntities = await this.testService.findAll();
    return testEntities.map((entity) => ({
      id: entity.id,
      name: entity.name,
    }));
  }

  @Get('/display-test-entity/:id')
  async displayTestEntity(@Req() req: { id: string }) {
    const testEntity = await this.testService.findOne(req.id);
    if (!testEntity) {
      return { message: 'Test entity not found' };
    }
    return {
      id: testEntity.id,
      name: testEntity.name,
    };
  }

  @Post('/create-test-entity')
  async createTestEntity(@Body() createTestDTO: CreateTestDto) {
    const newTestEntity = await this.testService.create(createTestDTO);
    return {
      id: newTestEntity.id,
      name: newTestEntity.name,
    };
  }
  @Put('/update-test-entity/:id')
  async updateTestEntity(@Body() updateTestDTO: UpdateTestDto, @Req() req: { id: string }) {
    const updatedEntity = await this.testService.update(req.id, updateTestDTO);
    if (!updatedEntity) {
      return { message: 'Test entity not found' };
    }
    return {
      id: updatedEntity.id,
      name: updatedEntity.name,
    };
  }
  @Delete('/delete-test-entity/:id')
  async deleteTestEntity(@Req() req: { id: string }) {
    await this.testService.delete(req.id);
    return { message: 'Test entity deleted successfully' };
  }
}
