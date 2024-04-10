import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ProductRequestDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @IsString({ message: 'O nome do produto deve ser uma string' })
  @MaxLength(255, {
    message: 'O nome do produto deve ter no máximo 255 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'O preço do produto é obrigatório' })
  price: number;

  @IsNotEmpty({ message: 'A descrição do produto é obrigatória' })
  @MaxLength(1000, {
    message: 'A descrição do produto deve ter no máximo 1000 caracteres',
  })
  description: string;

  @IsNotEmpty({ message: 'A categoria do produto é obrigatória' })
  categoryId: number;
}
