import GuidesRepository from '@repositories/GuidesRepository';
import { Guides } from '@entities/guides';
import { GuidesModel } from '@models/guides';
import mongoose, { ObjectId, Types } from 'mongoose';

jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');

  return {
    ...originalModule,
    Types: {
      ObjectId: jest.fn(),
    },
  };
});

jest.mock('@models/guides');

const GuidesModelMock = GuidesModel as jest.MockedClass<typeof GuidesModel>;
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

  it(`${GuidesRepository.prototype.create.name}: 
  quando o método for chamado deve ser feita a lógica de inserção`, async () => {
    const [guideTest] = guidesListMock;
    await instance.create(guideTest);
    expect(GuidesModelMock.create).toBeCalledTimes(1);
    expect(GuidesModelMock.create).toBeCalledWith(guideTest);
  });

  it(`${GuidesRepository.prototype.update.name}: 
  quando o método for chamado deve ser feita a lógica de atualização`, async () => {
    const [guideTest] = guidesListMock;
    const updateMock = {
      title: 'update teste',
      content: 'teste content',
    };

    const findByIdAndUpdateMock = jest.fn().mockImplementation(() => ({
      exec: async () => updateMock,
    }));
    GuidesModelMock.findByIdAndUpdate = findByIdAndUpdateMock;

    const mockObjectId = new mongoose.Types.ObjectId().toString();

    const result = await instance.update(mockObjectId, updateMock);

    expect(GuidesModelMock.findByIdAndUpdate).toBeCalledTimes(1);
    expect(GuidesModelMock.findByIdAndUpdate).toBeCalledWith(mockObjectId, updateMock, {
      returnOriginal: false,
    });
    expect(findByIdAndUpdateMock).toBeCalled();
    expect(result).toBe(updateMock);
  });

  it(`${GuidesRepository.prototype.get.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados`, async () => {
    const searchMock = {
      _id: {} as ObjectId,
    };
    const findByIdMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    GuidesModelMock.findById = findByIdMock;

    const result = await instance.get({} as ObjectId);

    expect(GuidesModelMock.findById).toBeCalledTimes(1);
    expect(GuidesModelMock.findById).toBeCalledWith({} as ObjectId);
    expect(findByIdMock).toBeCalled();
    expect(result).toBe(searchMock);
  });

  it(`${GuidesRepository.prototype.delete.name}: 
  quando o método for chamado deve ser feita a lógica de deletar o registro`, async () => {
    const searchMock = {
      _id: {} as ObjectId,
    };
    const findOneAndDeleteMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    GuidesModelMock.findOneAndDelete = findOneAndDeleteMock;

    const result = await instance.delete({} as ObjectId);
    expect(GuidesModelMock.findOneAndDelete).toBeCalledTimes(1);
    expect(GuidesModelMock.findOneAndDelete).toBeCalledWith(searchMock);
    expect(findOneAndDeleteMock).toBeCalled();
    expect(result).toBe(searchMock);
  });

  it(`${GuidesRepository.prototype.create.name}: 
  quando o método for chamado deve ser feita a listagem dos dados`, async () => {
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => guidesListMock,
    }));
    GuidesModelMock.find = findMock;

    const result = await instance.list();
    expect(GuidesModelMock.find).toBeCalledTimes(1);
    expect(result).toBe(guidesListMock);
  });

  it(`${GuidesRepository.prototype.getWithCategoriesAndContent.name}: 
  quando o método for chamado deve ser feita a busca do guide específico 
  com as categorias e conteúdos digitais relacionados`, async () => {
    const testId = '123456789123';
    GuidesModelMock.aggregate = jest.fn().mockImplementation(() => ({
      exec: async () => guidesListMock,
    }));

    const result = await instance.getWithCategoriesAndContent(testId);
    expect(GuidesModelMock.find).toBeCalledTimes(1);
    expect(result).toBe(guidesListMock[0]);
    expect(mockObjectIdConstructor).toBeCalledWith(testId);
  });
});
