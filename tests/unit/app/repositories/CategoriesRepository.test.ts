import { ObjectId } from 'mongoose';
import CategoriesRepository from '@repositories/CategoriesRepository';
import { Categories } from '@entities/categories';
import { Guides } from '@entities/guides';
import { CategoriesModel } from '@models/categories';

jest.mock('@models/categories');

const CategoriesModelMock = CategoriesModel as jest.MockedClass<typeof CategoriesModel>;

describe(CategoriesRepository.name, () => {
  let instance: CategoriesRepository;
  const categoriesListMock: Categories[] = [
    {
      title: 'teste jest',
      shortDescription: 'testando o test',
      guide: {} as Guides,
    },
    {
      title: 'teste2222 jest',
      shortDescription: 'testando o test2222',
      guide: {} as Guides,
    },
  ];

  beforeEach(() => {
    CategoriesModelMock.mockClear();
    instance = new CategoriesRepository();
  });

  it(`${CategoriesRepository.prototype.create.name}: 
  quando o método for chamado deve ser feita a lógica de inserção`, async () => {
    const [categoryTest] = categoriesListMock;
    await instance.create(categoryTest);
    expect(CategoriesModelMock.create).toBeCalledTimes(1);
    expect(CategoriesModelMock.create).toBeCalledWith(categoryTest);
  });

  it(`${CategoriesRepository.prototype.update.name}: 
  quando o método for chamado deve ser feita a lógica de atualização`, async () => {
    const [categoryTest] = categoriesListMock;
    const updateMock = {
      title: 'update teste',
      shortDescription: 'teste shortDescription',
      guide: {} as Guides,
    };

    const findOneAndUpdateMock = jest.fn().mockImplementation(() => ({
      exec: async () => updateMock,
    }));
    CategoriesModelMock.findOneAndUpdate = findOneAndUpdateMock;

    const result = await instance.update(categoryTest, updateMock);

    expect(CategoriesModelMock.findOneAndUpdate).toBeCalledTimes(1);
    expect(CategoriesModelMock.findOneAndUpdate).toBeCalledWith(categoryTest, updateMock);

    expect(result).toBe(updateMock);
  });

  it(`${CategoriesRepository.prototype.getById.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pelo Id`, async () => {
    const searchMock = {
      _id: {} as ObjectId,
      title: 'Result teste',
      shortDescription: 'shortDescription',
      guide: {} as Guides,
    };
    const findByIdMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    CategoriesModelMock.findById = findByIdMock;

    const { _id: id } = searchMock;
    const result = await instance.getById(id);

    expect(CategoriesModelMock.findById).toBeCalledTimes(1);
    expect(CategoriesModelMock.findById).toBeCalledWith(id);

    expect(result).toBe(searchMock);
  });

  it(`${CategoriesRepository.prototype.getByTitle.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pelo título`, async () => {
    const searchMock = {
      _id: {} as ObjectId,
      title: 'Result teste',
      shortDescription: 'shortDescription',
      guide: {} as Guides,
    };
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    CategoriesModelMock.find = findMock;

    const result = await instance.getByTitle(searchMock.title);

    expect(CategoriesModelMock.find).toBeCalledTimes(1);
    expect(CategoriesModelMock.find).toBeCalledWith({ title: searchMock.title });

    expect(result).toBe(searchMock);
  });

  it(`${CategoriesRepository.prototype.getByDescription.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pela descrição`, async () => {
    const searchMock = {
      _id: {} as ObjectId,
      title: 'Result teste',
      shortDescription: 'shortDescription',
      guide: {} as Guides,
    };
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    CategoriesModelMock.find = findMock;

    const result = await instance.getByDescription(searchMock.shortDescription);

    expect(CategoriesModelMock.find).toBeCalledTimes(1);
    expect(CategoriesModelMock.find).toBeCalledWith({
      shortDescription: searchMock.shortDescription,
    });

    expect(result).toBe(searchMock);
  });

  it(`${CategoriesRepository.prototype.getByTitleAndDescription.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pelo título e pela descrição`, async () => {
    const searchMock = {
      _id: {} as ObjectId,
      title: 'Result teste',
      shortDescription: 'shortDescription',
      guide: {} as Guides,
    };
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    CategoriesModelMock.find = findMock;

    const result = await instance.getByTitleAndDescription(
      searchMock.title,
      searchMock.shortDescription,
    );

    expect(CategoriesModelMock.find).toBeCalledTimes(1);
    expect(CategoriesModelMock.find).toBeCalledWith({
      title: searchMock.title,
      shortDescription: searchMock.shortDescription,
    });

    expect(result).toBe(searchMock);
  });

  it(`${CategoriesRepository.prototype.delete.name}: 
  quando o método for chamado deve ser feita a lógica de deletar o registro`, async () => {
    const [categoryTest] = categoriesListMock;

    const findOneAndDeleteMock = jest.fn().mockImplementation(() => ({
      exec: async () => true,
    }));

    CategoriesModelMock.findOneAndDelete = findOneAndDeleteMock;

    const result = await instance.delete(categoryTest);

    expect(CategoriesModelMock.findOneAndDelete).toBeCalledTimes(1);
    expect(CategoriesModelMock.findOneAndDelete).toBeCalledWith(categoryTest);

    expect(result).toEqual(true);
  });

  it(`${CategoriesRepository.prototype.deleteById.name}: 
  quando o método for chamado deve ser feita a lógica de deletar o registro através do Id`, async () => {
    const findOneAndDeleteMock = jest.fn().mockImplementation(() => ({
      exec: async () => true,
    }));

    CategoriesModelMock.findOneAndDelete = findOneAndDeleteMock;

    const id = {} as ObjectId;
    const result = await instance.deleteById(id);

    expect(CategoriesModelMock.findOneAndDelete).toBeCalledTimes(1);
    expect(CategoriesModelMock.findOneAndDelete).toBeCalledWith({ _id: id });

    expect(result).toEqual(true);
  });

  it(`${CategoriesRepository.prototype.list.name}: 
  quando o método for chamado deve ser feita a listagem dos dados`, async () => {
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => categoriesListMock,
    }));
    CategoriesModelMock.find = findMock;

    const result = await instance.list();

    expect(CategoriesModelMock.find).toBeCalledTimes(1);
    expect(result).toBe(categoriesListMock);
  });
});
