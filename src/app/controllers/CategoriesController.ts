import { Request, Response } from 'express';
import CategoriesRepository from '@repositories/CategoriesRepository';
import bindedInstance from '@utils/bindedInstance';

export class CategoriesController {
  private repository: CategoriesRepository;

  constructor() {
    this.repository = new CategoriesRepository();
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await this.repository.list();
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }

  async getCategoriesByGuide(req: Request, res: Response) {
    try {
      const categories = await this.repository.getByGuideId(req.params.id);
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const category = await this.repository.update(req.params.id, req.body);
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async registerCategory(req: Request, res: Response) {
    try {
      const categories = await this.repository.create(req.body);
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }

  async consultCategories(req: Request, res: Response) {
    try {
      const categories = await this.repository.getById(req.params.id);
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default bindedInstance(CategoriesController);
