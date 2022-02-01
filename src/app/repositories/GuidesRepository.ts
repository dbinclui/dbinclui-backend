import { ObjectId, Types } from 'mongoose';
import { Guides } from '../entities/guides';
import { GuidesModel } from '../models/guides';

class GuidesRepository {
  async create(guide: Guides) {
    return GuidesModel.create(guide);
  }

  async update(id: string, guide: Guides) {
    return GuidesModel.findByIdAndUpdate(id, guide, { returnOriginal: false }).exec();
  }

  async get(guideId: ObjectId | string) {
    return GuidesModel.findById(guideId).exec();
  }

  async delete(guideId: string) {
    return GuidesModel.findByIdAndDelete(guideId).exec();
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
          let: { guideId: '_id' },
          as: 'categories',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$guideId', '$guide'],
                },
              },
            },
            {
              $lookup: {
                from: 'digitalContent',
                let: { categoryId: '_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$$categoryId', '$category'],
                      },
                    },
                  },
                ],
                as: 'digitalContents',
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'digitalContent',
          let: { guideId: '_id' },
          as: 'digitalContents',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$guideId', '$guide'],
                },
              },
            },
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
