import { body, ValidationChain } from 'express-validator';
import { categoryValidate } from '@middlewares/validator/CategoriesValidator';

jest.useFakeTimers();
jest.mock('express-validator');

const bodyMock = body as jest.MockedFunction<typeof body>;

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
});
