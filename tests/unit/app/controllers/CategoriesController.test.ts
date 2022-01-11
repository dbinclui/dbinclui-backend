import { getMockReq, getMockRes } from '@jest-mock/express';
import { CategoriesController } from '@controllers/CategoriesController';
import CategoriesRepository from '@repositories/CategoriesRepository';

jest.mock('@repositories/CategoriesRepository');

const CategoriesRepositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
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
    expect(res.status).toHaveBeenCalledWith(400);
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
    expect(res.status).toHaveBeenCalledWith(200);
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
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });
});
