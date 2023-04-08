import { Injectable } from '@nestjs/common';
import { CreateNewsTypeDto } from './dto/create-news_type.dto';
import { UpdateNewsTypeDto } from './dto/update-news_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsTypes } from './entities/news_types.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsTypesService {
  constructor(
    @InjectRepository(NewsTypes)
    private newsTypesRepository: Repository<NewsTypes>,
  ) {}

  create(createNewsTypeDto: CreateNewsTypeDto): Promise<NewsTypes> {
    return this.newsTypesRepository.save({
      ...new NewsTypes(),
      ...createNewsTypeDto,
    });
  }

  findAll() {
    return this.newsTypesRepository.find();
  }

  findOne(id: number) {
    return this.newsTypesRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateNewsTypeDto: UpdateNewsTypeDto,
  ): Promise<NewsTypes | null> {
    const result = await this.newsTypesRepository.update(
      { id },
      updateNewsTypeDto,
    );
    return result.affected ? this.newsTypesRepository.findOneBy({ id }) : null;
  }

  async remove(id: number) {
    return await this.newsTypesRepository.delete({ id });
  }
}
