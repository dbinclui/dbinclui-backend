import { Request, Response } from 'express';
import { digitalContent as DigitalContent } from '@entities/digitalContent';
// import DigitalContentsRepository from '@repositories/DigitalContentsRepository';
import CategoriesRepository from '@repositories/CategoriesRepository';
import GuidesRepository from '@repositories/GuidesRepository';

export class DigitalContentController {
  private repository: CategoriesRepository;

  private categoriesRepository: CategoriesRepository;

  private guidesRepository: GuidesRepository;

  constructor() {
    this.repository = new CategoriesRepository();
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
      // TODO Precisamos de três coisas para criar o conteúdo digital no banco:
      //
      //  - O link do arquivo que vamos fazer o upload
      //  - O documento (ou ID do documento) do guia que o contéudo faz parte
      //  - O documento (ou ID do documento) da categoria que o contéudo pode fazer parte

      // aqui esses `req.body`s da vida vão ser substituidos pelo quer q seja quando precisar

      const category = req.body.category
        ? await this.categoriesRepository.getByTitle(req.body.category)
        : undefined;

      const guide = await this.guidesRepository.get(req.body.guide);

      const newDigitalContent: DigitalContent = {
        title: '',
        guide: {} as any,
        category: {} as any,
        shortDescription: '',
        filePath: '',
      };

      const createdDigitalContent = await this.repository.create(req.body);
      res.status(200).json({ data: newDigitalContent });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }
}

export default new DigitalContentController();
