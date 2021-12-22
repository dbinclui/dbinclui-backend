import GuidesRepository from '../../../../src/app/repositories/GuidesRepository';
import { Guides } from '../../../../src/app/entities/guides';
import { GuidesModel } from '../../../../src/app/models/guides';

jest.useFakeTimers();

jest.mock('../../../../src/app/models/guides');

const GuidesModelMock = GuidesModel as jest.MockedClass<typeof GuidesModel>;

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
      title: 'Result teste',
      content: 'content',
    };
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    GuidesModelMock.find = findMock;

    const result = await instance.get(searchMock);

    expect(GuidesModelMock.find).toBeCalledTimes(1);
    expect(GuidesModelMock.find).toBeCalledWith(searchMock);
    expect(findMock).toBeCalled();
    expect(result).toBe(searchMock);
  });

  it(`${GuidesRepository.prototype.get.name}: 
  quando o método for chamado deve ser feita a lógica de deletar o registro`, async () => {
    const [guideTest] = guidesListMock;

    const findOneAndDeleteMock = jest.fn().mockImplementation(() => ({
      exec: async () => true,
    }));

    GuidesModelMock.findOneAndDelete = findOneAndDeleteMock;

    const result = await instance.delete(guideTest);

    expect(GuidesModelMock.findOneAndDelete).toBeCalledTimes(1);
    expect(GuidesModelMock.findOneAndDelete).toBeCalledWith({
      title: guideTest.title,
      content: guideTest.content,
    });

    expect(findOneAndDeleteMock).toBeCalled();
    expect(result).toEqual(true);
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
