import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductResponseDto } from './dto/product-response.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        CategoryService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new Product()),
            save: jest.fn().mockResolvedValue(new Product()),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: { findOne: jest.fn().mockResolvedValue(new Product()) },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to find all products', async () => {
    const products = [createMockProduct()];

    const expectedResponse = ProductResponseDto.toListDto(products);

    jest.spyOn(service, 'findAll').mockResolvedValue(products);

    const response = await controller.findAll();

    expect(response).toStrictEqual(expectedResponse);
  });

  it('should be able to find a product by id', async () => {
    const product = createMockProduct();

    const expectedResponse = ProductResponseDto.toDto(product);

    jest.spyOn(service, 'findOne').mockResolvedValue(product);

    const response = await controller.findOne('1');

    expect(response).toStrictEqual(expectedResponse);
  });

  it('should be able to find products by category', async () => {
    const products = [createMockProduct()];

    const expectedResponse = ProductResponseDto.toListDto(products);

    jest.spyOn(service, 'findByCategory').mockResolvedValue(products);

    const response = await controller.findByCategory(1);

    expect(response).toStrictEqual(expectedResponse);
  });

  it('should be able to create a product', async () => {
    const product = createMockProduct();

    const expectedResponse = ProductResponseDto.toDto(product);

    jest.spyOn(service, 'create').mockResolvedValue(product);

    const response = await controller.create({
      name: 'Product Test',
      description: 'Product Test Description',
      price: 10,
      categoryId: 1,
    });

    expect(response).toStrictEqual(expectedResponse);
  });

  const createMockProduct = () => {
    const product = new Product();
    product.id = 1;
    product.name = 'Product Test';
    product.description = 'Product Test Description';
    product.price = 10;
    product.category = new Category();
    return product;
  };
});
