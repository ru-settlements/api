import { Module } from '@nestjs/common';
import { NewsTypesService } from './news_types.service';
import { NewsTypesController } from './news_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsTypes } from './entities/news_types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsTypes])],
  controllers: [NewsTypesController],
  providers: [NewsTypesService],
  exports: [TypeOrmModule],
})
export class NewsTypesModule {}
