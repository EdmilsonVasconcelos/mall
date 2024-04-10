import { Product } from '../entities/product.entity';
import { CategoryResponseDto } from '../../category/dto/category-response.dto';

export class ProductResponseDto {
  id: number;
  name: string;
  price: number;
  description: string;
  category: CategoryResponseDto;

  static toDto(product: Product): ProductResponseDto {
    const dto = new ProductResponseDto();
    dto.id = product.id;
    dto.name = product.name;
    dto.price = product.price;
    dto.description = product.description;
    dto.category = product.category
      ? CategoryResponseDto.toDto(product.category)
      : undefined;
    return dto;
  }

  static toListDto(products: Product[]): ProductResponseDto[] {
    return products.map((product) => this.toDto(product));
  }
}
