import { getMockReq, getMockRes } from '@jest-mock/express';
import { GuidesController } from '@controllers/GuidesController';
import GuidesRepository from '@repositories/GuidesRepository';

jest.mock('@repositories/GuidesRepository');

const GuidesRepositoryMock = GuidesRepository as jest.MockedClass<typeof GuidesRepository>;

describe(GuidesController.name, () => {
  let instance: GuidesController;

  beforeEach(() => {
    jest.clearAllMocks();
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

  it(`When ${GuidesController.prototype.registerGuide.name} is called, it should post the guides data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    req.body = [];
    GuidesRepositoryMock.prototype.create.mockResolvedValue(req.body);
    await instance.registerGuide(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
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
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${GuidesController.prototype.getWithCategoriesAndContent.name} is called, it should get the guides data
  `, async () => {
    const req = getMockReq({
      params: {
        guideId: '123456789123',
      },
    });
    const { res } = getMockRes();
    GuidesRepositoryMock.prototype.getWithCategoriesAndContent.mockResolvedValue({} as any);
    await instance.getWithCategoriesAndContent(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.getWithCategoriesAndContent).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
      }),
    );
  });

  it(`When ${GuidesController.prototype.getWithCategoriesAndContent.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq({
      params: {
        guideId: '123456789123',
      },
    });
    const { res } = getMockRes();
    const errorMessage = 'Error';
    GuidesRepositoryMock.prototype.getWithCategoriesAndContent.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.getWithCategoriesAndContent(req, res);
    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.getWithCategoriesAndContent).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${GuidesController.prototype.consultGuide.name} is called, it should get the Guides data by id
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    GuidesRepositoryMock.prototype.get.mockResolvedValue({} as any);

    await instance.consultGuide(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.get).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
      }),
    );
  });
});
