import { Request, Response, Express } from 'express';
import { DigitalContents } from '@entities/digitalContents';
import CategoriesRepository from '@repositories/CategoriesRepository';
import GuidesRepository from '@repositories/GuidesRepository';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';
import bindedInstance from '@utils/bindedInstance';

export class DigitalContentsController {
  private repository: DigitalContentRepository;

  private categoriesRepository: CategoriesRepository;

  private guidesRepository: GuidesRepository;

  constructor() {
    this.repository = new DigitalContentRepository();
    this.categoriesRepository = new CategoriesRepository();
    this.guidesRepository = new GuidesRepository();
  }

  async getDigitalContents(req: Request, res: Response) {
    try {
      const digitalContents = await this.repository.list();
      res.status(200).json({ data: digitalContents });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async updateDigitalContent(req: Request, res: Response) {
    try {
      const category = req.body.category
        ? await this.categoriesRepository.getById(req.body.category)
        : undefined;

      const getDigitalContent = await this.guidesRepository.get(req.params.id);
      if (!getDigitalContent)
        return res.status(404).json({ message: 'Esse conteúdo digital não existe' });

      const guide = await this.guidesRepository.get(req.body.guide);
      if (!guide) return res.status(404).json({ message: 'Esse guia não existe' });

      if (req.body.category && !category)
        return res.status(404).json({ message: 'Essa categoria não existe' });

      const { title, shortDescription } = req.body;

      // condição para novo conteúdo digital, com ou sem mídia nova
      /* Não atende o caso de uqererem editar somente um conteúdo e manter os outros,
       teria que ver a posição do array dp path excluido para executar a deleção e 
       criar um novo e por no mesmo lugar no array */
      let newDigitalContent: DigitalContents;
      if (req.files === null || req.files === undefined) {
        newDigitalContent = {
          title,
          guide,
          category,
          shortDescription,
        };
      } else {
        newDigitalContent = {
          title,
          guide,
          category,
          shortDescription,
          filePaths: (req.files! as Express.Multer.File[]).reduce(
            (paths: string[], file) => [...paths, file.path],
            [],
          ),
        };
      }

      const digitalContent = await this.repository.update(req.params.id, newDigitalContent);
      return res.status(200).json({ data: digitalContent });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }

  async registerDigitalContent(req: Request, res: Response) {
    try {
      const category = req.body.category
        ? await this.categoriesRepository.getById(req.body.category)
        : undefined;

      const guide = await this.guidesRepository.get(req.body.guide);

      if (!guide) return res.status(404).json({ message: 'Esse guia não existe' });

      if (req.body.category && !category)
        return res.status(404).json({ message: 'Essa categoria não existe' });

      const { title, shortDescription } = req.body;

      const newDigitalContent: DigitalContents = {
        title,
        guide,
        category,
        shortDescription,
        filePaths: (req.files! as Express.Multer.File[]).reduce(
          (paths: string[], file) => [...paths, file.path],
          [],
        ),
      };

      const createdDigitalContent = await this.repository.create(newDigitalContent);
      return res.status(201).json({ data: createdDigitalContent });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }
}

const instance = bindedInstance(DigitalContentsController);

export default instance;
