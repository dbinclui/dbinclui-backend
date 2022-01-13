import { getMockReq, getMockRes } from '@jest-mock/express';
import { validationResult, body, Result } from 'express-validator';
import { validateRequestSchema } from '@middlewares/validator/ValidateSchema';

jest.useFakeTimers();

jest.mock('express-validator');

const bodyMock = body as jest.MockedFunction<typeof body>;
const validationResultMock = validationResult as jest.MockedFunction<typeof validationResult>;

describe('CategoriesValidator Test', () => {
  beforeEach(() => {
    validationResultMock.mockClear();
    bodyMock.mockClear();
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
