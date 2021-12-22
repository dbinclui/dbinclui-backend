import { Guides } from '../entities/guides';
import GuidesModel from '../models/modelGuides';

export interface GuidesRepositoryInterface {
  buscar(): Promise<Guides[]>;
}

export class GuidesRepository implements GuidesRepositoryInterface {
  async buscar(): Promise<Guides[]> {
    return GuidesModel.find().exec();
  }
}

export default new GuidesRepository();
