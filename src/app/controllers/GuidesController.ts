import { Request, Response } from 'express';
import * as GuidesRepositorio from '../repositories/GuidesRepositorio';

export default class GuidesController {
  static async getGuides(req: Request, res: Response) {
    try {
      const guides = await GuidesRepositorio.GuidesRepositorio.buscar();
      res.status(200).json({ data: guides });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }
}
