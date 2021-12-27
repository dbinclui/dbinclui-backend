import { getMockReq, getMockRes } from '@jest-mock/express';
import { GuidesController } from '../../../../src/app/controllers/GuidesController';
import GuidesRepository from '../../../../src/app/repositories/GuidesRepository';

jest.mock('../../../../src/app/repositories/GuidesRepository');

const GuidesRepositoryMock = GuidesRepository as jest.MockedClass<typeof GuidesRepository>;

describe(GuidesController.name, () => {
  let instance: GuidesController;

  beforeEach(() => {
    GuidesRepositoryMock.mockClear();
    instance = new GuidesController();
  });

  it(`When 'construtor' is called should create the instances of GuidesRepository`, () => {
    expect(GuidesRepositoryMock).toHaveBeenCalledTimes(1);
  });

  it(`When ${GuidesController.prototype.getGuides.name} is called, it should get the guides data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    GuidesRepositoryMock.prototype.list.mockResolvedValue([]);
    await instance.getGuides(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.list).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${GuidesController.prototype.getGuides.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    GuidesRepositoryMock.prototype.list.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.getGuides(req, res);
    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.list).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${GuidesController.prototype.postGuides.name} is called, it should post the guides data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    req.body = [];
    GuidesRepositoryMock.prototype.create.mockResolvedValue(req.body);
    await instance.postGuides(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${GuidesController.prototype.postGuides.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    GuidesRepositoryMock.prototype.create.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.postGuides(req, res);
    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });
});
