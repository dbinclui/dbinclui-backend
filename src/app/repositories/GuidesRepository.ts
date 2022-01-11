import { ObjectId } from 'mongoose';
import { Guides } from '../entities/guides';
import { GuidesModel } from '../models/guides';

class GuidesRepository {
  async create(guide: Guides) {
    return GuidesModel.create(guide);
  }

  async update(guide: Guides, newGuide: Guides) {
    return GuidesModel.findOneAndUpdate(guide, newGuide).exec();
  }

  async get(guideId: ObjectId) {
    return GuidesModel.find({
      _id: guideId,
    }).exec();
  }

  async delete(guideId: ObjectId) {
    return GuidesModel.findOneAndDelete({
      _id: guideId,
    }).exec();
  }

  async list() {
    return GuidesModel.find().exec();
  }
}

export default GuidesRepository;
