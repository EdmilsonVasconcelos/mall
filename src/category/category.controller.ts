import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRequestDto } from './dto/category-request.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.create(
      Category.toDomain(createCategoryDto),
    );

    return CategoryResponseDto.toDto(category);
  }

  @Get()
  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.findAll();
    return CategoryResponseDto.toListDto(categories);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);
    return CategoryResponseDto.toDto(category);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CategoryRequestDto,
  ) {
    const category = Category.toDomain(updateCategoryDto);
    category.id = +id;

    return this.categoryService.update(category);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
