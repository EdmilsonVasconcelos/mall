import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShopDto } from './dto/shop/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async create(shop: Shop): Promise<Shop> {
    return this.shopRepository.save(shop);
  }

  async findAll(): Promise<Shop[]> {
    const shops: Shop[] = await this.shopRepository.find({
      relations: ['addresses'],
    });

    if (!shops.length) {
      throw new NotFoundException('No shops found');
    }

    return shops;
  }

  async findOne(id: number): Promise<Shop> {
    const shop: Shop = await this.shopRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    if (!shop) {
      throw new NotFoundException(`Shop with id ${id} not found`);
    }

    return shop;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
