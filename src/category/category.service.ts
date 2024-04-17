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

  async create(category: Category): Promise<Category> {
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

  async update(category: Category): Promise<Category> {
    await this.findOne(category.id);
    return this.create(category);
  }
  async remove(id: number) {
    return this.repository.delete(id);
  }
}
