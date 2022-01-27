import { getMockReq, getMockRes } from '@jest-mock/express';
import { validationResult, body, ValidationChain, Result } from 'express-validator';
import { guidesValidate, validateGuideforDelete } from '@middlewares/validator/GuidesValidator';
import CategoriesRepository from '@repositories/CategoriesRepository';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';
import mongoose, { ObjectId, Types } from 'mongoose';

jest.useFakeTimers();

jest.mock('express-validator');

const bodyMock = body as jest.MockedFunction<typeof body>;
const validationResultMock = validationResult as jest.MockedFunction<typeof validationResult>;
const CategoriesRepositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;
const DigitalContentRepositoryMock = DigitalContentRepository as jest.MockedClass<
  typeof DigitalContentRepository
>;

/* const CategoriesRepositoryMock = GuidesModel as jest.MockedClass<typeof GuidesModel>;
const mockObjectIdConstructor = Types.ObjectId as jest.MockedClass<typeof Types.ObjectId>;

describe(GuidesRepository.name, () => {
  let instance: GuidesRepository;
  const guidesListMock: Guides[] = [
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
    GuidesModelMock.mockClear();
    instance = new GuidesRepository();
  });
  */

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

  it(`${validateGuideforDelete.name}: Quando validateGuideforDelete for chamado, deve validar se é possível a deleção do guia`, async () => {
    const mockObjectId = new mongoose.Types.ObjectId().toString();

    const resultCategoryMock = await CategoriesRepositoryMock.prototype.getByGuideId(mockObjectId);
    const resultDigitalContentMock = await DigitalContentRepositoryMock.prototype.getByGuide(
      mockObjectId,
    );
    expect(resultCategoryMock).toHaveLength(0);
    expect(resultDigitalContentMock).toHaveLength(0);
    const result = resultCategoryMock.length === 0 && resultDigitalContentMock.length === 0;
    expect(result).toEqual(true);

    expect(CategoriesRepositoryMock.prototype.getByGuideId).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.getByGuideId).toHaveBeenCalled();
    expect(DigitalContentRepositoryMock.prototype.getByGuide).toBeCalled();
    expect(DigitalContentRepositoryMock.prototype.getByGuide).toHaveBeenCalled();
  });
});

/* it(`${validateGuideforDelete.name}: Quando validateGuideforDelete for chamado, deve validar se é possível a deleção do guia`, async () => {
  const mockObjectId = new mongoose.Types.ObjectId().toString();
  const searchMock = {
    _id: {} as string,
  };

  const categoryRepositoryMock = new CategoriesRepositoryMock();
  const digitalContentRepositoryMock = new DigitalContentRepositoryMock();

  try {
    const resultCategoryMock = await CategoriesRepositoryMock.prototype.getByGuideId(
      mockObjectId,
    );
    const resultDigitalContentMock = await DigitalContentRepositoryMock.prototype.getByGuide(
      mockObjectId,
    );
    expect(resultCategoryMock).toHaveLength(0);
    expect(resultDigitalContentMock).toHaveLength(0);
    const result = resultCategoryMock.length === 0 && resultDigitalContentMock.length === 0;
    expect(result).toEqual(true);
  } catch (error) {
    expect(error).toMatch('error');
  }

  expect(CategoriesRepositoryMock.prototype.getByGuideId).toBeCalled();
  expect(CategoriesRepositoryMock.prototype.getByGuideId).toHaveBeenCalled();
  expect(DigitalContentRepositoryMock).toBeCalled();
  expect(DigitalContentRepositoryMock.prototype.getByGuide).toHaveBeenCalled();
});
}); */

/*
it(`When ${GuidesController.prototype.registerGuide.name} is called, it should post the guides data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    req.body = [];
    GuidesRepositoryMock.prototype.create.mockResolvedValue(req.body);
    await instance.registerGuide(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${GuidesController.prototype.registerGuide.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    GuidesRepositoryMock.prototype.create.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.registerGuide(req, res);
    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  }); 
*/
