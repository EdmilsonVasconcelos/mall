import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRequestDto } from './dto/product-request.dto';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { CategoryService } from '../category/category.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async create(
    @Body() createProductDto: ProductRequestDto,
  ): Promise<ProductResponseDto> {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );

    const product = await this.productService.create(
      Product.toDomain(createProductDto, category),
    );

    return ProductResponseDto.toDto(product);
  }

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productService.findAll();
    return ProductResponseDto.toListDto(products);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.productService.findOne(+id);
    return ProductResponseDto.toDto(product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
