import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRequestDto } from './dto/category-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CategoryRequestDto): Promise<Category> {
    const category = Category.toDomain(createCategoryDto);

    return this.repository.save(category);
  }

  async findAll(): Promise<Category[]> {
    const categories: Category[] = await this.repository.find();

    if (!categories.length) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.repository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
