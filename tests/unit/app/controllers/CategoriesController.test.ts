import { getMockReq, getMockRes } from '@jest-mock/express';
import { CategoriesController } from '@controllers/CategoriesController';
import CategoriesRepository from '@repositories/CategoriesRepository';
import { validateCategoriesforDelete } from '@middlewares/validator/CategoriesValidator';
import DigitalContentsRepository from '@repositories/DigitalContentsRepository';

jest.mock('@repositories/CategoriesRepository');
jest.mock('@middlewares/validator/CategoriesValidator');
jest.mock('@repositories/DigitalContentsRepository');

const CategoriesRepositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;
const validateCategoriesforDeleteMock = validateCategoriesforDelete as jest.MockedFunction<
  typeof validateCategoriesforDelete
>;
const DigitalContentRepositoryMock = DigitalContentsRepository as jest.MockedClass<
  typeof DigitalContentsRepository
>;

describe(CategoriesController.name, () => {
  let instance: CategoriesController;

  beforeEach(() => {
    CategoriesRepositoryMock.mockClear();
    instance = new CategoriesController();
  });

  it(`When 'construtor' is called should create the instances of CategoriesRepository`, () => {
    expect(CategoriesRepositoryMock).toHaveBeenCalledTimes(1);
  });

  it(`When ${CategoriesController.prototype.getCategories.name} is called, it should get the Categories data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    CategoriesRepositoryMock.prototype.list.mockResolvedValue([]);
    await instance.getCategories(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.list).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${CategoriesController.prototype.getCategories.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    CategoriesRepositoryMock.prototype.list.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.getCategories(req, res);
    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.list).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${CategoriesController.prototype.getCategoriesByGuide.name} is called, it should get the Categories data by guide
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    CategoriesRepositoryMock.prototype.getByGuideId.mockResolvedValue([]);

    await instance.getCategoriesByGuide(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.getByGuideId).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${CategoriesController.prototype.getCategoriesByGuide.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    const errorMessage = 'Error';
    CategoriesRepositoryMock.prototype.getByGuideId.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );

    await instance.getCategoriesByGuide(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.list).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${CategoriesController.prototype.registerCategory.name} is called, it should post the Categories data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    req.body = [];
    CategoriesRepositoryMock.prototype.create.mockResolvedValue(req.body);
    await instance.registerCategory(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${CategoriesController.prototype.registerCategory.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    CategoriesRepositoryMock.prototype.create.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.registerCategory(req, res);
    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${CategoriesController.prototype.consultCategories.name} is called, it should get the Categories data by id
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    CategoriesRepositoryMock.prototype.getById.mockResolvedValue({} as any);

    await instance.consultCategories(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.getById).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
      }),
    );
  });

  it(`When ${CategoriesController.prototype.consultCategories.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    const errorMessage = 'Error';

    CategoriesRepositoryMock.prototype.getById.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );

    await instance.consultCategories(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.getById).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${CategoriesController.prototype.updateCategory.name} is called, it should update the categories data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    req.body = [];
    CategoriesRepositoryMock.prototype.update.mockResolvedValue(req.body);
    await instance.updateCategory(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${CategoriesController.prototype.updateCategory.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    CategoriesRepositoryMock.prototype.update.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.updateCategory(req, res);
    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${CategoriesController.prototype.deleteCategory.name}  is called, it should delete category
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    CategoriesRepositoryMock.prototype.deleteById.mockResolvedValue({} as any);

    validateCategoriesforDeleteMock.mockResolvedValue(true);
    await instance.deleteCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
      }),
    );
  });
});
