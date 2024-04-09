import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { CreateShopDto } from '../dto/shop/create-shop.dto';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Address, (address) => address.shop, { cascade: true })
  addresses: Address[];

  @Column()
  phoneNumber: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  static toDomain(shopDto: CreateShopDto): Shop {
    const shop = new Shop();
    shop.name = shopDto.name;
    shop.phoneNumber = shopDto.phoneNumber;
    shop.isActive = shopDto.isActive;
    shop.addresses = shopDto.addresses?.map((addressDto) =>
      Address.toDomain(addressDto),
    );

    return shop;
  }
}
