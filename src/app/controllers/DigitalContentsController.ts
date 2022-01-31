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
      const guide = await this.repository.update(req.params.id, req.body);
      res.status(200).json({ data: guide });
    } catch (error) {
      res.status(500).json({
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
