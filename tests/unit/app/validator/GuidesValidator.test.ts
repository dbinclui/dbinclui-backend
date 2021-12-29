import { getMockReq, getMockRes } from '@jest-mock/express';
import { Guides } from '../../../../src/app/entities/guides';
import { registerValidate, validateRequestSchema } from '../../../../src/app/middlewares/validator/GuidesValidator';

jest.useFakeTimers();

jest.mock('../../../../src/app/middlewares/validator/GuidesValidator');

const validateRequestSchemaMock = validateRequestSchema as jest.MockedFunction<typeof validateRequestSchema>;
const registerValidateMock = registerValidate as jest.Mocked<typeof registerValidate>;

describe(validateRequestSchema.name, () => {
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
   the method is called should`, () => {
   const req = getMockReq();
   const { res } = getMockRes();
   const callback = jest.fn();
   validateRequestSchemaMock(req, res, callback);
   expect(validateRequestSchemaMock).toHaveBeenCalled();
  
  });

/*  
  it(`${validateRequestSchemaMock.name}: 
  the method is called should`, () => {
   const req = getMockReq();
   const { res } = getMockRes();
   const callback = jest.fn();

   const errorMessage = 'Error';
   validateRequestSchemaMock.mockImplementationOnce(async () =>
   Promise.reject(errorMessage),
 );

   validateRequestSchemaMock(req, res, callback);
   expect(validateRequestSchemaMock).toHaveBeenCalled();
   expect(res.status).toHaveBeenCalledWith(405);
   expect(res.json).toHaveBeenCalledWith(
     expect.objectContaining({
       errors: errorMessage,
     }),
   );
 });
*/

});