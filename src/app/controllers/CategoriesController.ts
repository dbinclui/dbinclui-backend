import { Request, Response } from 'express';
import CategoriesRepository from '@repositories/CategoriesRepository';

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
}

export default new CategoriesController();
