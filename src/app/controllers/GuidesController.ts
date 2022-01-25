import { Request, Response } from 'express';
import GuidesRepository from '@repositories/GuidesRepository';
import bindedInstance from '@utils/bindedInstance';

export class GuidesController {
  private repository: GuidesRepository;

  constructor() {
    this.repository = new GuidesRepository();
  }

  async getGuides(req: Request, res: Response) {
    try {
      const guides = await this.repository.list();
      res.status(201).json({ data: guides });
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
      res.status(201).json({ data: guide });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async consultGuide(req: Request, res: Response) {
    try {
      const guides = await this.repository.get(req.params.id);
      res.status(201).json({ data: guides });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default bindedInstance(GuidesController);
