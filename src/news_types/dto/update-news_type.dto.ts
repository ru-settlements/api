import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsTypeDto } from './create-news_type.dto';

export class UpdateNewsTypeDto extends PartialType(CreateNewsTypeDto) {}
