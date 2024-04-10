import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository.find({ relations: ['category'] });

    if (!products.length) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
