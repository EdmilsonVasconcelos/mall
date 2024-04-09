import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from './shop.entity';
import { AddressDto } from '../dto/address/address.dto';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @ManyToOne(() => Shop, (shop) => shop.addresses)
  shop: Shop;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  static toDomain(addressDto: AddressDto): Address {
    const address = new Address();
    address.street = addressDto.street;
    address.number = addressDto.number;
    address.city = addressDto.city;

    return address;
  }
}
