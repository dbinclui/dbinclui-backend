import { ObjectId, Types } from 'mongoose';
import { Guides } from '../entities/guides';
import { GuidesModel } from '../models/guides';

class GuidesRepository {
  async create(guide: Guides) {
    return GuidesModel.create(guide);
  }

  async update(guideId: string, guide: Guides) {
    // return GuidesModel.findByIdAndUpdate(guideId, guide).exec();
    return GuidesModel.findOneAndUpdate({
      _id: guideId,
      guide,
    }).exec();
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
    // aggregate() returns an array, but since here we are searching by id we
    // get the first element of this array
    const [guide] = await GuidesModel.aggregate([
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

    return guide;
  }
}

export default GuidesRepository;
