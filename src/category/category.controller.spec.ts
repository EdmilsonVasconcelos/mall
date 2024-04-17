import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryRequestDto } from './dto/category-request.dto';
import { DeleteResult } from 'typeorm';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({} as DeleteResult),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get', () => {
    describe('findAll', () => {
      it('should return categories', async () => {
        const categories: Category[] = [createMockCategory()];

        const responseExpected: CategoryResponseDto[] =
          CategoryResponseDto.toListDto(categories);

        jest.spyOn(service, 'findAll').mockResolvedValue(categories);

        const response = await controller.findAll();

        expect(response).toStrictEqual(responseExpected);
      });
    });

    describe('findOne', () => {
      it('should return category', async () => {
        const category: Category = createMockCategory();

        const responseExpected: CategoryResponseDto =
          CategoryResponseDto.toDto(category);

        jest.spyOn(service, 'findOne').mockResolvedValue(category);

        const response = await controller.findOne('1');

        expect(response).toStrictEqual(responseExpected);
      });
    });
  });

  describe('Post', () => {
    describe('create', () => {
      it('should create a category', async () => {
        const category: Category = createMockCategory();
        const categoryRequestDto = CategoryRequestDto.toDto(category);

        const responseExpected: CategoryResponseDto =
          CategoryResponseDto.toDto(category);

        jest.spyOn(service, 'create').mockResolvedValue(category);

        const response = await controller.create(categoryRequestDto);

        expect(response).toStrictEqual(responseExpected);
      });
    });
  });

  describe('Patch', () => {
    it('should be able to update a category', async () => {
      const category: Category = createMockCategory();
      const categoryRequestDto = CategoryRequestDto.toDto(category);
      const expectedResponse = CategoryResponseDto.toDto(category);

      jest.spyOn(service, 'update').mockResolvedValue(category);

      const response = await controller.update('1', categoryRequestDto);

      expect(response).toEqual(expectedResponse);
    });
  });

  describe('Delete', () => {
    it('should be able to delete a category', () => {
      jest.spyOn(service, 'remove').mockResolvedValue({} as DeleteResult);

      expect(controller.remove('1')).resolves.toEqual({});
    });
  });

  const createMockCategory = () => {
    const category = new Category();
    category.id = 1;
    category.name = 'Category 1';
    return category;
  };
});
