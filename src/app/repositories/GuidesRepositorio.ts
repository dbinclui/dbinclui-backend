import { Guides } from '../entities/guides';
import GuidesModel from '../models/modelGuides';

export class GuidesRepositorio {
  static async buscar(): Promise<Guides[]> {
    return GuidesModel.find().exec();
  }
}
