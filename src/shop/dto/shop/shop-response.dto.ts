import { Shop } from '../../entities/shop.entity';
import { AddressDto } from '../address/address.dto';

export class ShopResponseDto {
  id: number;
  name: string;
  phoneNumber: string;
  isActive: boolean;
  addresses: AddressDto[];

  static toDto(shop: Shop): ShopResponseDto {
    const dto = new ShopResponseDto();
    dto.id = shop.id;
    dto.name = shop.name;
    dto.phoneNumber = shop.phoneNumber;
    dto.isActive = shop.isActive;
    dto.addresses = shop.addresses?.length
      ? AddressDto.toListDto(shop.addresses)
      : [];

    return dto;
  }

  static toListDto(shops: Shop[]): ShopResponseDto[] {
    return shops.map((shop) => this.toDto(shop));
  }
}
