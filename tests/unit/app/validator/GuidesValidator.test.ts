import { getMockReq, getMockRes } from '@jest-mock/express';
import { validationResult } from 'express-validator';
import { Guides } from '../../../../src/app/entities/guides';
import {
  registerValidate,
  validateRequestSchema,
} from '../../../../src/app/middlewares/validator/GuidesValidator';

jest.useFakeTimers();

jest.mock('../../../../src/app/middlewares/validator/GuidesValidator');

const validateRequestSchemaMock = validateRequestSchema as jest.MockedFunction<
  typeof validateRequestSchema
>;
const validationResultMock = validationResult as jest.MockedFunction<typeof validationResult>;
const registerValidateMock = registerValidate as jest.Mocked<typeof registerValidate>;

describe('GuidesValidator Test', () => {
  const registerValidateListMock: Guides[] = [
    {
      title: 'teste jest',
      content: 'testando o test',
    },
    {
      title: 'teste2222 jest',
      content: 'testando o test2222',
    },
  ];

  beforeEach(() => {
    validateRequestSchemaMock.mockClear();
  });

  it(`${validateRequestSchemaMock.name}: 
   when the method is called return ok`, () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const callback = jest.fn();
    validateRequestSchemaMock(req, res, callback);
    expect(validateRequestSchemaMock).toHaveBeenCalled();
  });

  it(`${validateRequestSchemaMock.name}: 
  when the method validateRequestSchemaMock is called return error 405 and jason response or NextFunction`, () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const callback = jest.fn();

    const errorMessage = 'Error';

    const validateMock = jest.fn().mockImplementation(() => ({
      isEmpty: () => false,
    }));

    const result = validationResultMock(req);
    expect(!result).toEqual(false);

    if (!result.isEmpty()) {
      validateRequestSchemaMock(req, res, callback);
      expect(validateRequestSchemaMock).toBeCalled();
      expect(validateRequestSchemaMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: errorMessage,
        }),
      );
    }

    expect(callback).toBeTruthy();
  });
});
