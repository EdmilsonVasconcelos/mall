import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CategoryRequestDto {
  id: number;

  @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
  @IsString({ message: 'O nome da categoria deve ser uma string.' })
  @MaxLength(255, {
    message: 'O nome da categoria deve ter no máximo 255 caracteres.',
  })
  name: string;

  static toDto(category: Category): CategoryRequestDto {
    const dto = new CategoryRequestDto();
    dto.id = category.id;
    dto.name = category.name;
    return dto;
  }
}
