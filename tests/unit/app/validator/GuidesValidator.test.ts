import { getMockReq, getMockRes } from '@jest-mock/express';
import { validationResult, body, ValidationChain, Result } from 'express-validator';
import { guidesValidate, validateGuideforDelete } from '@middlewares/validator/GuidesValidator';
import CategoriesRepository from '@repositories/CategoriesRepository';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';
import mongoose, { ObjectId, Types } from 'mongoose';
import { Guides } from '@entities/guides';

jest.mock('express-validator');
jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');

  return {
    ...originalModule,
    Types: {
      ObjectId: jest.fn(),
    },
  };
});
jest.mock('@repositories/CategoriesRepository');
jest.mock('@repositories/DigitalContentsRepository');
const bodyMock = body as jest.MockedFunction<typeof body>;
const validationResultMock = validationResult as jest.MockedFunction<typeof validationResult>;
const CategoriesRepositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;
const DigitalContentRepositoryMock = DigitalContentRepository as jest.MockedClass<
  typeof DigitalContentRepository
>;

describe('GuidesValidator Test', () => {
  beforeEach(() => {
    validationResultMock.mockClear();
    bodyMock.mockClear();
  });

  it(`${guidesValidate.name}: When guidesValidate is call should create validation schema`, () => {
    const validatSchemaChainMock = {
      notEmpty: jest.fn().mockImplementation(() => validatSchemaChainMock),
      withMessage: jest.fn().mockImplementation((_) => validatSchemaChainMock),
      isLength: jest.fn().mockImplementation(() => validatSchemaChainMock),
      isString: jest.fn().mockImplementation(() => validatSchemaChainMock),
    } as unknown as ValidationChain;
    bodyMock.mockImplementation(() => validatSchemaChainMock);
    guidesValidate();
    expect(validatSchemaChainMock.notEmpty).toBeCalledTimes(2);
    expect(validatSchemaChainMock.withMessage).toBeCalledTimes(3);
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(1, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(
      2,
      'Deve ter entre 1 e 32 caracteres',
    );
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(3, 'O campo está vazio');
    expect(validatSchemaChainMock.isLength).toBeCalledTimes(1);
    expect(validatSchemaChainMock.isLength).toBeCalledWith({ min: 1, max: 32 });
    expect(validatSchemaChainMock.isString).toBeCalledTimes(2);
    expect(bodyMock).toBeCalledWith('title');
    expect(bodyMock).toBeCalledWith('content');
  });

  it(`${validateRequestSchema.name}: 
  when the body is invalid should return response with status and error content`, () => {
    const status = 400;
    const errorsMessage = ['Invalide title', 'Invalid content'];
    const req = getMockReq();
    const isEmpty = jest.fn();
    const errorsArray = jest.fn();
    isEmpty.mockReturnValue(false);
    errorsArray.mockReturnValue(errorsMessage);
    validationResultMock.mockImplementation(
      () =>
        ({
          isEmpty,
          array: errorsArray,
        } as unknown as Result),
    );
    const { res, next } = getMockRes();

    validateRequestSchema(req, res, next);
    expect(validationResultMock).toBeCalled();
    expect(isEmpty).toBeCalledTimes(1);
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(status);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        errors: errorsMessage,
      }),
    );
  });

  it(`${validateGuideforDelete.name}: Quando validateGuideforDelete for chamado, deve validar se é possível a deleção do guia`, async () => {
    const mockObjectId = new mongoose.Types.ObjectId().toString();

    CategoriesRepositoryMock.prototype.getByGuideId.mockResolvedValue([]);
    DigitalContentRepositoryMock.prototype.getByGuide.mockResolvedValue([]);

    const result = await validateGuideforDelete(mockObjectId);
    expect(result).toBe(true);

    expect(CategoriesRepositoryMock.prototype.getByGuideId).toBeCalled();
    expect(DigitalContentRepositoryMock.prototype.getByGuide).toBeCalled();
  });

  it(`When ${validateGuideforDelete.name} is called and throws a new error, it should handle the errors
  `, async () => {
    expect.assertions(2);
    const mockObjectId = new mongoose.Types.ObjectId().toString();

    CategoriesRepositoryMock.prototype.getByGuideId.mockRejectedValue([]);
    DigitalContentRepositoryMock.prototype.getByGuide.mockRejectedValue([]);

    try {
      await validateGuideforDelete(mockObjectId);
    } catch (error) {
      expect(error).toEqual({
        message: error,
      });
    }
    expect(CategoriesRepositoryMock).toBeCalled();
    expect(DigitalContentRepositoryMock).toBeCalled();
  });
});
