import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { AddressDto } from '../address/address.dto';

export class CreateShopDto {
  id: number;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'O número de telefone é obrigatório.' })
  @IsString({ message: 'O número de telefone deve ser uma string.' })
  @MaxLength(255, {
    message: 'O número de telefone deve ter no máximo 255 caracteres.',
  })
  @Matches(/^[0-9]{11}$/, {
    message: 'O número de telefone deve ter exatamente 11 dígitos.',
  })
  phoneNumber: string;

  @IsBoolean({ message: 'O campo isActive deve ser um booleano.' })
  isActive: boolean;

  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  addresses: AddressDto[];
}
