import { Category } from '../entities/category.entity';

export class CategoryResponseDto {
  id: number;
  name: string;

  static toDto(category: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();
    dto.id = category.id;
    dto.name = category.name;
    return dto;
  }

  static toListDto(categories: Category[]): CategoryResponseDto[] {
    return categories.map((category) => this.toDto(category));
  }
}
