import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsTypesService } from './news_types.service';
import { CreateNewsTypeDto } from './dto/create-news_type.dto';
import { UpdateNewsTypeDto } from './dto/update-news_type.dto';

@Controller('news-types')
export class NewsTypesController {
  constructor(private readonly newsTypesService: NewsTypesService) {}

  @Post()
  create(@Body() createNewsTypeDto: CreateNewsTypeDto) {
    return this.newsTypesService.create(createNewsTypeDto);
  }

  @Get()
  findAll() {
    return this.newsTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsTypeDto: UpdateNewsTypeDto,
  ) {
    return this.newsTypesService.update(+id, updateNewsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsTypesService.remove(+id);
  }
}
