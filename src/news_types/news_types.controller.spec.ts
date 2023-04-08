import { Test, TestingModule } from '@nestjs/testing';
import { NewsTypesController } from './news_types.controller';
import { NewsTypesService } from './news_types.service';

describe('NewsTypesController', () => {
  let controller: NewsTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsTypesController],
      providers: [NewsTypesService],
    }).compile();

    controller = module.get<NewsTypesController>(NewsTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
