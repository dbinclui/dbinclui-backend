import GuidesRepository from '@repositories/GuidesRepository';
import { Guides } from '@entities/guides';
import { GuidesModel } from '@models/guides';
import { Mongoose } from 'mongoose';

jest.useFakeTimers();

jest.mock('@models/guides');

const GuidesModelMock = GuidesModel as jest.MockedClass<typeof GuidesModel>;
const mockObjectId = new Mongoose.prototype.ObjectId;

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

    const findOneAndUpdateMock = jest.fn().mockImplementation(() => ({
      exec: async () => updateMock,
    }));
    GuidesModelMock.findOneAndUpdate = findOneAndUpdateMock;

    const result = await instance.update(guideTest, updateMock);

    expect(GuidesModelMock.findOneAndUpdate).toBeCalledTimes(1);
    expect(GuidesModelMock.findOneAndUpdate).toBeCalledWith(guideTest, updateMock);
    expect(findOneAndUpdateMock).toBeCalled();
    expect(result).toBe(updateMock);
  });

  it(`${GuidesRepository.prototype.get.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados`, async () => {
    const searchMock = {
      _id: mockObjectId
    };
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    GuidesModelMock.find = findMock;

    const result = await instance.get(mockObjectId);

    expect(GuidesModelMock.find).toBeCalledTimes(1);
    expect(GuidesModelMock.find).toBeCalledWith(searchMock);
    expect(findMock).toBeCalled();
    expect(result).toBe(searchMock);
  });

  it(`${GuidesRepository.prototype.delete.name}: 
  quando o método for chamado deve ser feita a lógica de deletar o registro`, async () => {
    const searchMock = {
      _id: mockObjectId
    };
    const findOneAndDeleteMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    GuidesModelMock.findOneAndDelete = findOneAndDeleteMock;

    const result = await instance.delete(mockObjectId);
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
});
