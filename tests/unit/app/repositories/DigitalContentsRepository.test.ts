import mongoose, { ObjectId } from 'mongoose';
import DigitalContentsRepository from '@repositories/DigitalContentsRepository';
import { DigitalContents } from '@entities/digitalContents';
import { Guides } from '@entities/guides';
import { Categories } from '@entities/categories';
import { DigitalContentsModel } from '@models/digitalContents';

jest.mock('@models/digitalContents');

const DigitalContentsModelMock = DigitalContentsModel as jest.MockedClass<
  typeof DigitalContentsModel
>;

describe(DigitalContentsRepository.name, () => {
  let instance: DigitalContentsRepository;
  const digitalContentsListMock: DigitalContents[] = [
    {
      _id: {} as ObjectId,
      title: 'Result teste',
      shortDescription: 'shortDescription',
      guide: {} as Guides,
      category: {} as Categories,
      filePaths: ['arquivo.txt'],
    },
    {
      _id: {} as ObjectId,
      title: 'Result teste 2',
      shortDescription: 'shortDescription 2',
      guide: {} as Guides,
      category: {} as Categories,
      filePaths: ['arquivo2.txt'],
    },
  ];

  beforeEach(() => {
    DigitalContentsModelMock.mockClear();
    instance = new DigitalContentsRepository();
  });

  it(`${DigitalContentsRepository.prototype.create.name}: 
  quando o método for chamado deve ser feita a lógica de inserção`, async () => {
    const [categoryTest] = digitalContentsListMock;

    await instance.create(categoryTest);

    expect(DigitalContentsModelMock.create).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.create).toBeCalledWith(categoryTest);
  });

  it(`${DigitalContentsRepository.prototype.update.name}: 
  quando o método for chamado deve ser feita a lógica de atualização`, async () => {
    const [updateMock] = digitalContentsListMock;

    const findByIdAndUpdateMock = jest.fn().mockImplementation(() => ({
      exec: async () => updateMock,
    }));
    DigitalContentsModelMock.findByIdAndUpdate = findByIdAndUpdateMock;
    const mockObjectId = new mongoose.Types.ObjectId().toString();

    const result = await instance.update(mockObjectId, updateMock);

    expect(DigitalContentsModelMock.findByIdAndUpdate).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.findByIdAndUpdate).toBeCalledWith(mockObjectId, updateMock);

    expect(result).toBe(updateMock);
  });

  it(`${DigitalContentsRepository.prototype.getById.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pelo Id`, async () => {
    const [searchMock] = digitalContentsListMock;

    const findByIdMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    DigitalContentsModelMock.findById = findByIdMock;

    const { _id: id } = searchMock;
    const result = await instance.getById(id!);

    expect(DigitalContentsModelMock.findById).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.findById).toBeCalledWith(id);

    expect(result).toBe(searchMock);
  });

  it(`${DigitalContentsRepository.prototype.getByTitle.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pelo título`, async () => {
    const [searchMock] = digitalContentsListMock;

    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    DigitalContentsModelMock.find = findMock;

    const result = await instance.getByTitle(searchMock.title);

    expect(DigitalContentsModelMock.find).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.find).toBeCalledWith({ title: searchMock.title });

    expect(result).toBe(searchMock);
  });

  it(`${DigitalContentsRepository.prototype.getByDescription.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pela descrição`, async () => {
    const [searchMock] = digitalContentsListMock;

    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    DigitalContentsModelMock.find = findMock;

    const result = await instance.getByDescription(searchMock.shortDescription);

    expect(DigitalContentsModelMock.find).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.find).toBeCalledWith({
      shortDescription: searchMock.shortDescription,
    });

    expect(result).toBe(searchMock);
  });

  it(`${DigitalContentsRepository.prototype.getByTitleAndDescription.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pelo título e pela descrição`, async () => {
    const [searchMock] = digitalContentsListMock;

    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    DigitalContentsModelMock.find = findMock;

    const result = await instance.getByTitleAndDescription(
      searchMock.title,
      searchMock.shortDescription,
    );

    expect(DigitalContentsModelMock.find).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.find).toBeCalledWith({
      title: searchMock.title,
      shortDescription: searchMock.shortDescription,
    });

    expect(result).toBe(searchMock);
  });

  it(`${DigitalContentsRepository.prototype.delete.name}: 
  quando o método for chamado deve ser feita a lógica de deletar o registro`, async () => {
    const [categoryTest] = digitalContentsListMock;

    const findOneAndDeleteMock = jest.fn().mockImplementation(() => ({
      exec: async () => true,
    }));

    DigitalContentsModelMock.findOneAndDelete = findOneAndDeleteMock;

    const result = await instance.delete(categoryTest);

    expect(DigitalContentsModelMock.findOneAndDelete).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.findOneAndDelete).toBeCalledWith(categoryTest);

    expect(result).toEqual(true);
  });

  it(`${DigitalContentsRepository.prototype.deleteById.name}: 
  quando o método for chamado deve ser feita a lógica de deletar o registro através do Id`, async () => {
    const findOneAndDeleteMock = jest.fn().mockImplementation(() => ({
      exec: async () => true,
    }));

    DigitalContentsModelMock.findOneAndDelete = findOneAndDeleteMock;

    const id = {} as ObjectId;
    const result = await instance.deleteById(id);

    expect(DigitalContentsModelMock.findOneAndDelete).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.findOneAndDelete).toBeCalledWith({ _id: id });

    expect(result).toEqual(true);
  });

  it(`${DigitalContentsRepository.prototype.list.name}: 
  quando o método for chamado deve ser feita a listagem dos dados`, async () => {
    const findMock = jest.fn().mockImplementation(() => ({
      exec: async () => digitalContentsListMock,
    }));
    DigitalContentsModelMock.find = findMock;

    const result = await instance.list();

    expect(DigitalContentsModelMock.find).toBeCalledTimes(1);
    expect(result).toBe(digitalContentsListMock);
  });

  it(`${DigitalContentsRepository.prototype.getByGuide.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pela Guia`, async () => {
    const [searchMock] = digitalContentsListMock;

    const findByIdMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    DigitalContentsModelMock.find = findByIdMock;

    const id = {} as ObjectId;
    const result = await instance.getByGuide(id!);

    expect(DigitalContentsModelMock.find).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.find).toBeCalledWith({ guide: id });

    expect(result).toBe(searchMock);
  });

  it(`${DigitalContentsRepository.prototype.getByCategory.name}: 
  quando o método for chamado deve ser feita a lógica de procurar os dados pela Categoria`, async () => {
    const [searchMock] = digitalContentsListMock;

    const findByIdMock = jest.fn().mockImplementation(() => ({
      exec: async () => searchMock,
    }));

    DigitalContentsModelMock.findById = findByIdMock;

    const { _id: id } = searchMock;
    const result = await instance.getByCategory(id!);

    expect(DigitalContentsModelMock.findById).toBeCalledTimes(1);
    expect(DigitalContentsModelMock.findById).toBeCalledWith(id);

    expect(result).toBe(searchMock);
  });
});
