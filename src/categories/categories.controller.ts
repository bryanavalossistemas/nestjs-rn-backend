import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParseIntPositivePipe } from '../common/pipes/parse-int-positive.pipe';
import { NotEmptyObjectPipe } from '../common/pipes/not-empy-object.pipe';
import { GetCategoriesQueryDto } from './dto/get-categories-query.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body(NotEmptyObjectPipe) createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() queryObject: GetCategoriesQueryDto) {
    const { query, take, skip } = queryObject;
    return this.categoriesService.findAll(query, take, skip);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPositivePipe)
    id: number,
  ) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPositivePipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPositivePipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
