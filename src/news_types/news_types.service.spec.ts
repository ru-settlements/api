import { Test, TestingModule } from '@nestjs/testing';
import { NewsTypesService } from './news_types.service';

describe('NewsTypesService', () => {
  let service: NewsTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsTypesService],
    }).compile();

    service = module.get<NewsTypesService>(NewsTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
