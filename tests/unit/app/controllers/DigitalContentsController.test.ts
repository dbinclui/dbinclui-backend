import { Express } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { DigitalContentsController } from '@controllers/DigitalContentsController';
import DigitalContentsRepository from '@repositories/DigitalContentsRepository';
import CategoriesRepository from '@repositories/CategoriesRepository';
import GuidesRepository from '@repositories/GuidesRepository';

jest.mock('@repositories/DigitalContentsRepository');
jest.mock('@repositories/CategoriesRepository');
jest.mock('@repositories/GuidesRepository');

const DigitalContentsRepositoryMock = DigitalContentsRepository as jest.MockedClass<
  typeof DigitalContentsRepository
>;

const CategoriesRepositoryMock = CategoriesRepository as jest.MockedClass<
  typeof CategoriesRepository
>;

const GuidesRepositoryMock = GuidesRepository as jest.MockedClass<typeof GuidesRepository>;

describe(DigitalContentsController.name, () => {
  let instance: DigitalContentsController;

  beforeEach(() => {
    jest.clearAllMocks();

    instance = new DigitalContentsController();
  });

  it(`When 'construtor' is called should create all necessary instances`, () => {
    expect(DigitalContentsRepositoryMock).toHaveBeenCalled();
    expect(CategoriesRepositoryMock).toHaveBeenCalled();
    expect(GuidesRepositoryMock).toHaveBeenCalled();
  });

  it(`When ${DigitalContentsController.prototype.getDigitalContents.name} is called, it should get the Digital Content data
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();

    const listResult: any[] = [];
    DigitalContentsRepositoryMock.prototype.list.mockResolvedValue(listResult);

    await instance.getDigitalContents(req, res);

    expect(DigitalContentsRepositoryMock.prototype.list).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: listResult,
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.getDigitalContents.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq();
    const { res } = getMockRes();

    const errorMessage = 'Error';
    DigitalContentsRepositoryMock.prototype.list.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );

    await instance.getDigitalContents(req, res);

    expect(DigitalContentsRepositoryMock.prototype.list).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.registerDigitalContent.name} is called, it should post the Digital Content data
  `, async () => {
    const { res } = getMockRes();
    const req = getMockReq({
      files: [{ path: 'path-teste' }],
      body: {
        category: 'id-teste',
        guide: 'id-teste',
        title: 'titulo',
        shortDescription: 'descricao',
      },
    });

    // placeholder values to help jest identify each object, and to test if they are indeed manipulated correctly
    const mockGuide: any = { name: 'guide' };
    const mockCategory: any = { name: 'category' };

    const createdDigitalContent: any = {
      ...req.body,
      category: mockCategory,
      guide: mockGuide,
      filePaths: (req.files! as Express.Multer.File[]).reduce(
        (paths: string[], file) => [...paths, file.path],
        [],
      ),
    };

    GuidesRepositoryMock.prototype.get.mockResolvedValue(mockGuide);
    CategoriesRepositoryMock.prototype.getById.mockResolvedValue(mockCategory);
    DigitalContentsRepositoryMock.prototype.create.mockResolvedValue(createdDigitalContent);

    await instance.registerDigitalContent(req, res);

    expect(CategoriesRepositoryMock.prototype.getById).toHaveBeenCalledWith(req.body.category);
    expect(GuidesRepositoryMock.prototype.get).toHaveBeenCalledWith(req.body.guide);
    expect(DigitalContentsRepositoryMock.prototype.create).toHaveBeenCalledWith(
      createdDigitalContent,
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: createdDigitalContent,
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.registerDigitalContent.name} is called and an invalid guide Id is provided, the error should be handled
  `, async () => {
    const { res } = getMockRes();
    const req = getMockReq({
      files: [{ path: 'path-teste' }],
      body: {
        category: 'id-teste',
        guide: '',
        title: 'titulo',
        shortDescription: 'descricao',
      },
    });

    const errorMessage = 'Esse guia não existe';

    GuidesRepositoryMock.prototype.get.mockResolvedValue(null);

    await instance.registerDigitalContent(req, res);

    expect(CategoriesRepositoryMock.prototype.getById).toHaveBeenCalledWith(req.body.category);
    expect(GuidesRepositoryMock.prototype.get).toHaveBeenCalledWith(req.body.guide);
    expect(DigitalContentsRepositoryMock.prototype.create).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.registerDigitalContent.name} throws an error, the error should be handled
  `, async () => {
    const { res } = getMockRes();
    const req = getMockReq({
      files: [{ path: 'path-teste' }],
      body: {
        category: 'id-teste',
        guide: 'id-teste',
        title: 'titulo',
        shortDescription: 'descricao',
      },
    });

    const errorMessage = 'Error';
    DigitalContentsRepositoryMock.prototype.create.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );
    GuidesRepositoryMock.prototype.get.mockResolvedValue({} as any);

    await instance.registerDigitalContent(req, res);

    expect(CategoriesRepositoryMock.prototype.getById).toHaveBeenCalledWith(req.body.category);
    expect(GuidesRepositoryMock.prototype.get).toHaveBeenCalledWith(req.body.guide);
    expect(DigitalContentsRepositoryMock.prototype.create).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.consultDigitalContent.name} is called, it should get the Guide by id
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    DigitalContentsRepositoryMock.prototype.getById.mockResolvedValue({} as any);

    await instance.consultDigitalContent(req, res);

    expect(DigitalContentsRepositoryMock).toBeCalled();
    expect(DigitalContentsRepositoryMock.prototype.getById).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {},
      }),
    );
  });

  it(`When ${DigitalContentsController.prototype.consultDigitalContent.name} is called and throws a new error, it should handle the errors
  `, async () => {
    const req = getMockReq({
      params: { id: '' },
    });
    const { res } = getMockRes();

    const errorMessage = 'Error';

    DigitalContentsRepositoryMock.prototype.getById.mockImplementationOnce(async () =>
      Promise.reject(errorMessage),
    );

    await instance.consultDigitalContent(req, res);

    expect(DigitalContentsRepositoryMock).toBeCalled();
    expect(DigitalContentsRepositoryMock.prototype.getById).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      }),
    );
  });
});
