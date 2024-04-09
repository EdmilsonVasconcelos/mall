import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
import { ShopResponseDto } from './dto/shop/shop-response.dto';
import { Address } from './entities/address.entity';

describe('ShopController', () => {
  let controller: ShopController;
  let service: ShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopController],
      providers: [
        {
          provide: ShopService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ShopController>(ShopController);
    service = module.get<ShopService>(ShopService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get', () => {
    describe('findAll', () => {
      it('should return shops', async () => {
        const shops: Shop[] = [createMockShop()];

        const responseExpected: ShopResponseDto[] =
          ShopResponseDto.toListDto(shops);

        jest.spyOn(service, 'findAll').mockResolvedValue(shops);

        const response = await controller.findAll();

        expect(response).toStrictEqual(responseExpected);
      });
    });

    describe('findOne', () => {
      it('should return shop', async () => {
        const shop: Shop = createMockShop();

        const responseExpected: ShopResponseDto = ShopResponseDto.toDto(shop);

        jest.spyOn(service, 'findOne').mockResolvedValue(shop);

        const response = await controller.findOne('1');

        expect(response).toStrictEqual(responseExpected);
      });
    });
  });

  describe('Post', () => {
    it('should create a shop', async () => {
      const shop: Shop = createMockShop();

      const expectedResponse = ShopResponseDto.toDto(shop);

      jest.spyOn(service, 'create').mockResolvedValue(shop);

      const response = await controller.create(shop);

      expect(response).toStrictEqual(expectedResponse);
    });
  });

  const createMockShop = (): Shop => {
    const shop = new Shop();
    shop.id = 1;
    shop.name = 'Shop Name';
    shop.isActive = true;
    shop.phoneNumber = '123456789';
    shop.addresses = [createMockAddress()];
    return shop;
  };

  const createMockAddress = (): Address => {
    const address = new Address();
    address.id = 2;
    address.street = 'Street Name';
    address.city = 'City Name';
    address.number = '123';
    return address;
  };
});
