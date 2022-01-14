import { getMockReq, getMockRes } from '@jest-mock/express';
import { DigitalContentsController } from '@controllers/DigitalContentsController';
import CategoriesRepository from '@repositories/CategoriesRepository';

jest.mock('@repositories/CategoriesRepository');

const CategoriesRepositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;

describe(DigitalContentsController.name, () => {
  let instance: DigitalContentsController;

  beforeEach(() => {
    CategoriesRepositoryMock.mockClear();
    instance = new DigitalContentsController();
  });

  it(`When 'construtor' is called should create the instances of CategoriesRepository`, () => {
    expect(CategoriesRepositoryMock).toHaveBeenCalledTimes(1);
  });

  it(`When ${DigitalContentsController.prototype.getDigitalContents.name} is called, it should get the Categories data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    CategoriesRepositoryMock.prototype.list.mockResolvedValue([]);
    await instance.getDigitalContents(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.list).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.getDigitalContents.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    CategoriesRepositoryMock.prototype.list.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.getDigitalContents(req, res);
    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.list).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.registerDigitalContent.name} is called, it should post the Categories data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    req.body = [];

    CategoriesRepositoryMock.prototype.create.mockResolvedValue(req.body);

    await instance.registerDigitalContent(req, res);

    expect(CategoriesRepositoryMock).toBeCalled();
    expect(CategoriesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.registerDigitalContent.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    CategoriesRepositoryMock.prototype.create.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.registerDigitalContent(req, res);
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
