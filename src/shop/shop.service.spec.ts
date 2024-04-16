import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

describe('ShopService', () => {
  let service: ShopService;
  let repository: Repository<Shop>;
  let addressRepository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Shop),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
    repository = module.get<Repository<Shop>>(getRepositoryToken(Shop));
    addressRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
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

  it('should be able to find shop by id', async () => {
    const shop: Shop = createMockShop();

    jest.spyOn(repository, 'findOne').mockResolvedValue(shop);

    const response = await service.findOne(1);

    expect(response).toEqual(shop);
  });

  it('should throw not found exception when no shop was not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOne(1)).rejects.toThrow(
      'Shop with id 1 not found',
    );
  });

  it('should be able to create a shop', async () => {
    const shop = createMockShop();

    jest.spyOn(repository, 'save').mockResolvedValue(shop);

    const response = await service.create(shop);

    expect(response).toEqual(shop);
  });

  it('should be able to update a shop', async () => {
    const shop = createMockShop();

    jest.spyOn(repository, 'save').mockResolvedValue(shop);

    const response = await service.update(1, shop);

    expect(response).toEqual(shop);
  });

  it('should be able to remove a shop', async () => {
    const shop = createMockShop();

    jest.spyOn(repository, 'findOne').mockResolvedValue(shop);

    jest.spyOn(addressRepository, 'remove').mockResolvedValue({} as Address);

    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 1, raw: null });

    const response = await service.remove(1);

    expect(response).toEqual({ affected: 1, raw: null });
  });

  const createMockShop = () => {
    const shop = new Shop();
    shop.id = 1;
    shop.name = 'Shop Name';
    return shop;
  };
});
