import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryRequestDto } from '../dto/category-request.dto';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  static toDomain(categoryDto: CategoryRequestDto): Category {
    const category = new Category();
    category.id = categoryDto.id;
    category.name = categoryDto.name;
    return category;
  }

  static toListDomain(categoryDtos: CategoryRequestDto[]): Category[] {
    return categoryDtos.map((categoryDto) => this.toDomain(categoryDto));
  }
}
