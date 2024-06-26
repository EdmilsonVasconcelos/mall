import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Address } from 'src/shop/entities/address.entity';

export class AddressDto {
  id: number;

  @IsNotEmpty({ message: 'A rua é obrigatória.' })
  @IsString({ message: 'A rua deve ser uma string.' })
  @MaxLength(255, { message: 'A rua deve ter no máximo 255 caracteres.' })
  street: string;

  @IsNotEmpty({ message: 'O número do estabelecimento é obrigatório.' })
  @IsString({ message: 'O número do estabelecimento deve ser uma string.' })
  @MaxLength(255, {
    message: 'O número do estabelecimento deve ter no máximo 255 caracteres.',
  })
  number: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  @IsString({ message: 'O bairro deve ser uma string.' })
  @MaxLength(255, { message: 'O bairro deve ter no máximo 255 caracteres.' })
  neighborhood: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString({ message: 'A cidade deve ser uma string.' })
  @MaxLength(255, { message: 'A cidade deve ter no máximo 255 caracteres.' })
  city: string;

  static toDto(address: Address): AddressDto {
    const dto = new AddressDto();
    dto.id = address.id;
    dto.street = address.street;
    dto.number = address.number;
    dto.city = address.city;
    dto.neighborhood = address.neighborhood;

    return dto;
  }

  static toListDto(addresses: Address[]): AddressDto[] {
    return addresses.map((address) => this.toDto(address));
  }
}
