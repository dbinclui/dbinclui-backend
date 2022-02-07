import { Request, Response, Express } from 'express';
import { DigitalContents } from '@entities/digitalContents';
import CategoriesRepository from '@repositories/CategoriesRepository';
import GuidesRepository from '@repositories/GuidesRepository';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';
import bindedInstance from '@utils/bindedInstance';
import { v2 as cloudinary } from 'cloudinary';

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
      const getDigitalContent = await this.repository.getById(req.params.id);
      if (!getDigitalContent)
        return res.status(404).json({ message: 'Esse conteúdo digital não existe' });

      const category = req.body.category
        ? await this.categoriesRepository.getById(req.body.category)
        : undefined;
      if (req.body.category && !category)
        return res.status(404).json({ message: 'Essa categoria não existe' });

      const guide = await this.guidesRepository.get(req.body.guide);
      if (!guide) return res.status(404).json({ message: 'Esse guia não existe' });

      const { title, shortDescription } = req.body;

      let newDigitalContent: DigitalContents;
      if (req.files?.length === 0) {
        newDigitalContent = {
          title,
          guide,
          category,
          shortDescription,
          filePaths: getDigitalContent.filePaths,
        };
      } else {
        newDigitalContent = {
          title,
          guide,
          category,
          shortDescription,
          filePaths: (req.files! as Express.Multer.File[]).reduce(
            (fileDetails: any, file) => [
              ...fileDetails,
              {
                filePath: file.path,
                publicId: file.filename,
              },
            ],
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
          (fileDetails: any, file) => [
            ...fileDetails,
            {
              filePath: file.path,
              publicId: file.filename,
            },
          ],
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

  async consultDigitalContent(req: Request, res: Response) {
    try {
      const digitalContent = await this.repository.getById(req.params.id);
      res.status(200).json({ data: digitalContent });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async deleteDigitalContent(req: Request, res: Response) {
    try {
      const digitalContent = await this.repository.getById(req.params.id);

      if (!digitalContent) return res.status(404).send('Conteúdo Digital não encontrado!');

      const publicIds = digitalContent.filePaths.map((filePath) => filePath.publicId);

      const deleteFiles = await cloudinary.api.delete_resources(publicIds);

      const deleteDigitalContent = await this.repository.deleteById(req.params.id);

      return res.status(200).json({
        dbResponse: deleteDigitalContent,
        cldResponse: deleteFiles,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
}

const instance = bindedInstance(DigitalContentsController);

export default instance;
