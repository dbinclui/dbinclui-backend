import { Request, Response } from 'express';
import CategoriesRepository from '@repositories/CategoriesRepository';
import bindedInstance from '@utils/bindedInstance';
import DigitalContentRepository from '@repositories/DigitalContentsRepository';
import { validateCategoriesforDelete } from '@middlewares/validator/CategoriesValidator';

export class CategoriesController {
  private repository: CategoriesRepository;

  private digitalContentRepository: DigitalContentRepository;

  constructor() {
    this.repository = new CategoriesRepository();
    this.digitalContentRepository = new DigitalContentRepository();
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await this.repository.list();
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({
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

  async consultCategories(req: Request, res: Response) {
    try {
      const categories = await this.repository.getById(req.params.id);
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async registerCategory(req: Request, res: Response) {
    try {
      const categories = await this.repository.create(req.body);
      res.status(201).json({ data: categories });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const resultDigitalContent = await this.digitalContentRepository.getByCategory(req.params.id);
      if (resultDigitalContent !== null) {
        const validate = await validateCategoriesforDelete(req.params.id);
        if (validate === true) {
          const deletedCategory = await this.repository.deleteById(req.params.id);
          res.status(200).json({ data: deletedCategory });
        } else if (typeof validate === 'object') {
          res.status(500).json({ message: validate.message });
        } else {
          res.status(422).json({ message: 'A categoria informada possui conteúdo digital.' });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default bindedInstance(CategoriesController);
