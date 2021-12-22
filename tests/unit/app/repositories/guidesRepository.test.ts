import GuidesRepository from '../../../../src/app/repositories/guidesRepository';
import { GuidesModel } from '../../../../src/app/models/guides';
import { Guides } from '../../../../src/app/entities/guides';

describe('guidesRepository', () => {
  const repository = new GuidesRepository();
  const guideTest: Guides = {
    title: 'teste jest',
    content: 'testando o test',
  };
  const guideTest2: Guides = {
    title: 'teste2222 jest',
    content: 'testando o test2222',
  };

  describe('teste criar', () => {
    test('deve inserir sem erro', async () => {
      expect(async () => {
        await repository.create(guideTest);
      }).not.toThrow();
    });
    test('deve inserir o guide e obter o objeto inserido no bd', async () => {
      const guideInserido: Guides = await repository.create(guideTest);
      expect(guideInserido.title).toBe(guideTest.title);
      expect(guideInserido.content).toBe(guideTest.content);
    });
    test('deve buscar', async () => {
      expect(async () => {
        const guideBuscado = await repository.get(guideTest);
      }).not.toThrow();
    });
    test('deve deletar o guide do bd sem retornar erro', async () => {
      expect(async () => {
        await repository.delete(guideTest);
      }).not.toThrow();
    });
    test('deve listar os guides', async () => {
        const guidesrepositorio = await repository.list();
        expect(guidesrepositorio).toBeDefined();
      });
  });
  test('deve atualizar', async () => {
      const guide1 = await repository.create(guideTest);
      const guide2 = await repository.create(guideTest2);

      expect(async () => {
        await repository.update(guide1, guide2);
      }).toBe(guide1);
    });
});
