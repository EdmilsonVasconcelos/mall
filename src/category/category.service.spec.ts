import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to find all categories', async () => {
    const categories: Category[] = [createMockCategory()];

    jest.spyOn(repository, 'find').mockResolvedValue(categories);

    const response = await service.findAll();

    expect(response).toEqual(categories);
    expect(response.length).toEqual(1);
  });

  it('should throw not found exception when no categories are found', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(service.findAll()).rejects.toThrow('No categories found');
  });

  it('should be able to find category by id', async () => {
    const category: Category = createMockCategory();

    jest.spyOn(repository, 'findOne').mockResolvedValue(category);

    const response = await service.findOne(1);

    expect(response).toEqual(category);
  });

  it('should throw not found exception when no category was not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOne(1)).rejects.toThrow(
      'Category with id 1 not found',
    );
  });

  it('should be able to create a category', async () => {
    const category = createMockCategory();

    jest.spyOn(repository, 'save').mockResolvedValue(category);

    const response = await service.create(category);

    expect(response).toEqual(category);
  });

  const createMockCategory = () => {
    const category = new Category();
    category.id = 1;
    category.name = 'Test Category';
    return category;
  };
});
