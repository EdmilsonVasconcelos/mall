import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/shop/create-shop.dto';
import { UpdateShopDto } from './dto/shop/update-shop.dto';
import { ShopResponseDto } from './dto/shop/shop-response.dto';
import { Shop } from './entities/shop.entity';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto): Promise<ShopResponseDto> {
    const shop = await this.shopService.create(Shop.toDomain(createShopDto));
    return ShopResponseDto.toDto(shop);
  }

  @Get()
  async findAll(): Promise<ShopResponseDto[]> {
    const shops = await this.shopService.findAll();
    return ShopResponseDto.toListDto(shops);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ShopResponseDto> {
    const shop = await this.shopService.findOne(+id);
    return ShopResponseDto.toDto(shop);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
