import { getMockReq, getMockRes } from '@jest-mock/express';
import { GuidesController } from '@controllers/GuidesController';
import GuidesRepository from '@repositories/GuidesRepository';
import mongoose, { ObjectId, Types } from 'mongoose';
import { validateGuideforDelete } from '@middlewares/validator/GuidesValidator';
import { Guides } from '@entities/guides';

jest.mock('@repositories/GuidesRepository');
jest.mock('@middlewares/validator/GuidesValidator');

const GuidesRepositoryMock = GuidesRepository as jest.MockedClass<typeof GuidesRepository>;
const validateGuideforDeleteMock = validateGuideforDelete as jest.MockedFunction<
  typeof validateGuideforDelete
>;

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
    expect(res.status).toHaveBeenCalledWith(500);
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
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${GuidesController.prototype.updateGuide.name} is called, it should update the guides data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    req.body = [];
    GuidesRepositoryMock.prototype.update.mockResolvedValue(req.body);
    await instance.updateGuide(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
      }),
    );
  });

  it(`When ${GuidesController.prototype.updateGuide.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    const errorMessage = 'Error';
    GuidesRepositoryMock.prototype.update.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    await instance.updateGuide(req, res);
    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
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

  it(`When ${GuidesController.prototype.deleteGuide.name} is called and the guide has categories or digital contents, it should return a 422 error
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    const errorMessage = 'A guia informada possui categorias ou conteúdos digitais.';

    GuidesRepositoryMock.prototype.delete.mockResolvedValue({} as any);
    validateGuideforDeleteMock.mockResolvedValue(false);
    await instance.deleteGuide(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${GuidesController.prototype.deleteGuide.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();
    const errorMessage = 'Error';
    GuidesRepositoryMock.prototype.delete.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    validateGuideforDeleteMock.mockResolvedValue(true);
    await instance.deleteGuide(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(GuidesRepositoryMock.prototype.delete).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${GuidesController.prototype.deleteGuide.name}  is called, it should delete guide
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    validateGuideforDeleteMock.mockResolvedValue(true);
    await instance.deleteGuide(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
      }),
    );
  });
  it(`When ${GuidesController.prototype.deleteGuide.name} is called and the guide doesn't exist, it should return a 422 error
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    const errorMessage = 'A guia informada não existe.';

    GuidesRepositoryMock.prototype.get.mockResolvedValue(null);
    await instance.deleteGuide(req, res);

    expect(GuidesRepositoryMock).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });
});
