import { body, ValidationChain } from 'express-validator';
import {
  categoryValidate,
  validateCategoriesforDelete,
} from '@middlewares/validator/CategoriesValidator';
import CategoriesRepository from '@repositories/CategoriesRepository';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';
import mongoose from 'mongoose';

jest.useFakeTimers();
jest.mock('express-validator');
jest.mock('@repositories/CategoriesRepository');
jest.mock('@repositories/DigitalContentsRepository');
const bodyMock = body as jest.MockedFunction<typeof body>;
jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');

  return {
    ...originalModule,
    Types: {
      ObjectId: jest.fn(),
    },
  };
});
const CategoriesRepositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;
const DigitalContentRepositoryMock = DigitalContentRepository as jest.MockedClass<
  typeof DigitalContentRepository
>;

describe('CategoriesValidator Test', () => {
  beforeEach(() => {
    bodyMock.mockClear();
  });

  it(`${categoryValidate.name}: When registerValidate is call should create validation schema`, () => {
    const validatSchemaChainMock = {
      notEmpty: jest.fn().mockImplementation(() => validatSchemaChainMock),
      withMessage: jest.fn().mockImplementation((_) => validatSchemaChainMock),
      isString: jest.fn().mockImplementation(() => validatSchemaChainMock),
    } as unknown as ValidationChain;
    bodyMock.mockImplementation(() => validatSchemaChainMock);

    categoryValidate();

    expect(validatSchemaChainMock.notEmpty).toBeCalledTimes(3);
    expect(validatSchemaChainMock.withMessage).toBeCalledTimes(3);
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(1, 'O campo está vazio');

    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(2, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(3, 'O campo está vazio');

    expect(validatSchemaChainMock.isString).toBeCalledTimes(3);
    expect(bodyMock).toBeCalledWith('title');
    expect(bodyMock).toBeCalledWith('shortDescription');
    expect(bodyMock).toBeCalledWith('guide');
  });

  it(`${validateCategoriesforDelete.name}: Quando validateCategoriesforDelete for chamado, deve validar se é possível a deleção da categoria`, async () => {
    const mockObjectId = new mongoose.Types.ObjectId().toString();

    DigitalContentRepositoryMock.prototype.getByCategory.mockResolvedValue([]);

    const result = await validateCategoriesforDelete(mockObjectId);
    expect(result).toBe(true);

    expect(DigitalContentRepositoryMock.prototype.getByCategory).toBeCalled();
  });

  it(`When ${validateCategoriesforDelete.name} is called and throws a new error, it should handle the errors
  `, async () => {
    expect.assertions(1);
    const mockObjectId = new mongoose.Types.ObjectId().toString();

    DigitalContentRepositoryMock.prototype.getByCategory.mockRejectedValue([]);

    try {
      await validateCategoriesforDelete(mockObjectId);
    } catch (error) {
      expect(error).toEqual({
        message: error,
      });
    }
    expect(DigitalContentRepositoryMock).toBeCalled();
  });
});
