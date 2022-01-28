import { Request, Response } from 'express';
import GuidesRepository from '@repositories/GuidesRepository';
import bindedInstance from '@utils/bindedInstance';
import { validateGuideforDelete } from '@middlewares/validator/GuidesValidator';

export class GuidesController {
  private repository: GuidesRepository;

  constructor() {
    this.repository = new GuidesRepository();
  }

  async getGuides(req: Request, res: Response) {
    try {
      const guides = await this.repository.list();
      res.status(200).json({ data: guides });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async registerGuide(req: Request, res: Response) {
    try {
      const guides = await this.repository.create(req.body);
      res.status(201).json({ data: guides });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async getWithCategoriesAndContent(req: Request, res: Response) {
    try {
      const guide = await this.repository.getWithCategoriesAndContent(req.params.guideId);
      res.status(200).json({ data: guide });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async updateGuide(req: Request, res: Response) {
    try {
      const guide = await this.repository.update(req.params.id, req.body);
      res.status(200).json({ data: guide });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async consultGuide(req: Request, res: Response) {
    try {
      const guides = await this.repository.get(req.params.id);
      res.status(200).json({ data: guides });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async deleteGuide(req: Request, res: Response) {
    try {
      const guide = await this.repository.get(req.params.id);
      if (guide !== null) {
        const validate = await validateGuideforDelete(req.params.id);
        if (validate) {
          const deletedGuide = await this.repository.delete(req.params.id);
          res.status(200).json({ data: deletedGuide });
        } else {
          res
            .status(401)
            .json({ message: 'A guia informada possui categorias ou conteúdos digitais.' });
        }
      } else {
        res
        .status(401)
        .json({ message: 'A guia informada não existe.' });
      }
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default bindedInstance(GuidesController);
