import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

describe('ShopService', () => {
  let service: ShopService;
  let repository: Repository<Shop>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: getRepositoryToken(Shop),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
    repository = module.get<Repository<Shop>>(getRepositoryToken(Shop));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to find all shops', async () => {
    const shops: Shop[] = [createMockShop()];

    jest.spyOn(repository, 'find').mockResolvedValue(shops);

    const response = await service.findAll();

    expect(response).toEqual(shops);
    expect(response.length).toEqual(1);
  });

  it('should throw not found exception when no shops are found', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(service.findAll()).rejects.toThrow('No shops found');
  });

  it('should be able to create a shop', async () => {
    const shop = createMockShop();

    jest.spyOn(repository, 'save').mockResolvedValue(shop);

    const response = await service.create(shop);

    expect(response).toEqual(shop);
  });

  const createMockShop = () => {
    const shop = new Shop();
    shop.id = 1;
    shop.name = 'Shop Name';
    return shop;
  };
});
