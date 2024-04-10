import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductRequestDto } from '../dto/product-request.dto';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  static toDomain(dto: ProductRequestDto, category: Category) {
    const product = new Product();
    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.category = category;
    return product;
  }
}
