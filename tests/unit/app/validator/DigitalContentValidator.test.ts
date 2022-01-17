import { body, check, ValidationChain } from 'express-validator';
import { registerValidate } from '@middlewares/validator/DigitalContentValidator';

jest.useFakeTimers();
jest.mock('express-validator');

const bodyMock = body as jest.MockedFunction<typeof body>;
const checkMock = check as jest.MockedFunction<typeof check>;

describe('DigitalContentValidator Test', () => {
  beforeEach(() => {
    bodyMock.mockClear();
  });

  it(`${registerValidate.name}: When registerValidate is call should create validation schema`, () => {
    const validatSchemaChainMock = {
      notEmpty: jest.fn().mockImplementation(() => validatSchemaChainMock),
      withMessage: jest.fn().mockImplementation((_) => validatSchemaChainMock),
      isString: jest.fn().mockImplementation(() => validatSchemaChainMock),
      custom: jest.fn().mockImplementation(() => validatSchemaChainMock),
    } as unknown as ValidationChain;

    bodyMock.mockImplementation(() => validatSchemaChainMock);
    checkMock.mockImplementation(() => validatSchemaChainMock);

    registerValidate();

    expect(validatSchemaChainMock.notEmpty).toBeCalledTimes(3);

    expect(validatSchemaChainMock.withMessage).toBeCalledTimes(5);
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(1, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(2, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(3, 'O campo está vazio');
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(
      4,
      'Envie ao menos um arquivo.',
    );
    expect(validatSchemaChainMock.withMessage).toHaveBeenNthCalledWith(
      5,
      'Arquivo não suportado. Envie apenas vídeo ou imagem.',
    );

    expect(validatSchemaChainMock.isString).toBeCalledTimes(3);

    expect(validatSchemaChainMock.custom).toBeCalledTimes(2);

    expect(bodyMock).toBeCalledWith('title');
    expect(bodyMock).toBeCalledWith('shortDescription');
    expect(bodyMock).toBeCalledWith('guide');

    expect(checkMock).toBeCalledWith('files');
  });
});
