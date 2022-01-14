import { Request, Response } from 'express';
import { DigitalContents } from '@entities/digitalContents';
import CategoriesRepository from '@repositories/CategoriesRepository';
import GuidesRepository from '@repositories/GuidesRepository';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';

export class DigitalContentController {
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
      res.status(400).json({
        message: error,
      });
    }
  }

  async registerDigitalContent(req: Request, res: Response) {
    try {
      if (!req.file)
        return res.status(500).json({ message: 'Ocorreu um erro ao fazer o upload do arquivo' });

      const category = req.body.category
        ? await this.categoriesRepository.getById(req.body.category)
        : undefined;

      const guide = await this.guidesRepository.get(req.body.guide);

      if (!guide) return res.status(400).json({ message: 'Esse guia não existe' });

      const { title, shortDescription } = req.body;

      const newDigitalContent: DigitalContents = {
        title,
        guide,
        category,
        shortDescription,
        filePath: req.file.path,
      };

      const createdDigitalContent = await this.repository.create(newDigitalContent);
      return res.status(200).json({ data: createdDigitalContent });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }
}

export default new DigitalContentController();
