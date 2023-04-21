import { Injectable } from '@nestjs/common';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}

  create(createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsRepository.save({
      ...new News(),
      ...createNewsDto,
    });
  }

  findAll() {
    return this.newsRepository.find({
      relations: {
        type: true,
      },
    });
  }

  findOne(id: number) {
    return this.newsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateNewsDto: Partial<CreateNewsDto>,
  ): Promise<News | null> {
    const result = await this.newsRepository.update({ id }, updateNewsDto);
    return result.affected ? this.newsRepository.findOneBy({ id }) : null;
  }

  remove(id: number) {
    return this.newsRepository.delete({ id });
  }
}
