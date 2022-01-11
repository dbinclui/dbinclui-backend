import { getMockReq, getMockRes } from '@jest-mock/express';
import { validationResult, body, ValidationChain, Result } from 'express-validator';
import {
  validateRequestSchema,
  registerValidate,
} from '@middlewares/validator/CategoriesValidator';

jest.useFakeTimers();

jest.mock('express-validator');

const bodyMock = body as jest.MockedFunction<typeof body>;
const validationResultMock = validationResult as jest.MockedFunction<typeof validationResult>;

describe('CategoriesValidator Test', () => {
  beforeEach(() => {
    validationResultMock.mockClear();
    bodyMock.mockClear();
  });

  it(`${registerValidate.name}: When registerValidate is call should create validation schema`, () => {
    const validatSchemaChainMock = {
      notEmpty: jest.fn().mockImplementation(() => validatSchemaChainMock),
      withMessage: jest.fn().mockImplementation((_) => validatSchemaChainMock),
      isString: jest.fn().mockImplementation(() => validatSchemaChainMock),
    } as unknown as ValidationChain;
    bodyMock.mockImplementation(() => validatSchemaChainMock);

    registerValidate();

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

  it(`${validateRequestSchema.name}: 
  when the body is invalid should return response with status and error content`, () => {
    const status = 405;
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

  it(`${validateRequestSchema.name}: 
   when the body is valid should call next`, () => {
    const req = getMockReq();
    const isEmpty = jest.fn();
    validationResultMock.mockImplementation(
      () =>
        ({
          isEmpty,
        } as unknown as Result),
    );
    isEmpty.mockReturnValue(true);
    const { res, next } = getMockRes();
    validateRequestSchema(req, res, next);
    expect(validationResultMock).toBeCalled();
    expect(isEmpty).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);
  });
});
