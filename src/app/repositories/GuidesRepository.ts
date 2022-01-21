import { ObjectId, Types } from 'mongoose';
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
    return GuidesModel.findById(guideId).exec();
  }

  async delete(guideId: ObjectId) {
    return GuidesModel.findOneAndDelete({
      _id: guideId,
    }).exec();
  }

  async list() {
    return GuidesModel.find().exec();
  }

  async getWithCategoriesAndContent(guideId: string) {
    return GuidesModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(guideId) },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'guide',
          as: 'categories',
          pipeline: [
            {
              $lookup: {
                from: 'digitalContent',
                localField: '_id',
                foreignField: 'category',
                as: 'digitalContents',
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'digitalContent',
          localField: '_id',
          foreignField: 'guide',
          as: 'digitalContents',
          pipeline: [
            {
              $match: { category: undefined },
            },
          ],
        },
      },
    ]).exec();
  }
}

export default GuidesRepository;
