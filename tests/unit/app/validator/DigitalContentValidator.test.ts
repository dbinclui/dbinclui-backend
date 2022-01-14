import { body, ValidationChain } from 'express-validator';
import { registerValidate } from '@middlewares/validator/DigitalContentValidator';

jest.useFakeTimers();
jest.mock('express-validator');

const bodyMock = body as jest.MockedFunction<typeof body>;

describe('DigitalContentValidator Test', () => {
  beforeEach(() => {
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

    expect(validatSchemaChainMock.notEmpty).toBeCalledTimes(4);
    expect(validatSchemaChainMock.withMessage).toBeCalledTimes(4);
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(1, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(2, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(3, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(4, 'O campo está vazio');

    expect(validatSchemaChainMock.isString).toBeCalledTimes(4);
    expect(bodyMock).toBeCalledWith('title');
    expect(bodyMock).toBeCalledWith('shortDescription');
    expect(bodyMock).toBeCalledWith('guide');
    expect(bodyMock).toBeCalledWith('filePath');
  });
});
