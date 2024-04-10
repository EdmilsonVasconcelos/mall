import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to find all products', async () => {
    const products: Product[] = [createMockProduct()];

    jest.spyOn(repository, 'find').mockResolvedValue(products);

    const response = await service.findAll();

    expect(response).toEqual(products);
    expect(response.length).toEqual(1);
  });

  it('should return not found when there are no products', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(service.findAll()).rejects.toThrow('No products found');
  });

  it('should be able to find one product', async () => {
    const product: Product = createMockProduct();

    jest.spyOn(repository, 'findOne').mockResolvedValue(product);

    const response = await service.findOne(1);

    expect(response).toEqual(product);
  });

  it('should return not found when there are no finding by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow('Product 1 not found');
  });

  it('should be able to create a product', async () => {
    const product: Product = createMockProduct();

    jest.spyOn(repository, 'save').mockResolvedValue(product);

    const response = await service.create(product);

    expect(response).toEqual(product);
  });

  const createMockProduct = () => {
    const product = new Product();
    product.id = 1;
    product.name = 'Product 1';
    product.price = 10;
    product.description = 'Description';
    product.category = createMockCategory();
    return product;
  };

  const createMockCategory = () => {
    const category = new Category();
    category.id = 1;
    category.name = 'Category 1';
    return category;
  };
});
