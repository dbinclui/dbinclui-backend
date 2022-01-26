import { getMockReq, getMockRes } from '@jest-mock/express';
import { validationResult, body, ValidationChain, Result } from 'express-validator';
import { guidesValidate } from '@middlewares/validator/GuidesValidator';

jest.useFakeTimers();

jest.mock('express-validator');

const bodyMock = body as jest.MockedFunction<typeof body>;
const validationResultMock = validationResult as jest.MockedFunction<typeof validationResult>;

describe('GuidesValidator Test', () => {
  beforeEach(() => {
    validationResultMock.mockClear();
    bodyMock.mockClear();
  });

  it(`${guidesValidate.name}: When registerValidate is call should create validation schema`, () => {
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
});
