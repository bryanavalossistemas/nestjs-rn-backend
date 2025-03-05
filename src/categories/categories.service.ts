import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryRepository.insert(createCategoryDto);

    return 'Categoría creada correctamente';
  }

  async findAll(query: string, take: number, skip: number) {
    return await this.categoryRepository.findAndCount({
      where: { name: Like(`%${query || ''}%`) },
      take,
      skip,
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const exists = await this.categoryRepository.existsBy({ id });
    if (!exists)
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    await this.categoryRepository.update(id, updateCategoryDto);

    return 'Categoría actualizada correctamente';
  }

  async remove(id: number) {
    const exists = await this.categoryRepository.existsBy({ id });
    if (!exists)
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);

    await this.categoryRepository.delete(id);

    return `Categoría eliminada correctamente`;
  }
}
