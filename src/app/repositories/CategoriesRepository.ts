import { Categories } from '@entities/categories';
import { CategoriesModel } from '@models/categories';
import { ObjectId } from 'mongoose';

class CategoriesRepository {
  async create(category: Categories) {
    return CategoriesModel.create(category);
  }

  async update(id: string, category: Categories) {
    return CategoriesModel.findByIdAndUpdate(id, category, { returnOriginal: false }).exec();
  }

  async getById(id: ObjectId | string) {
    return CategoriesModel.findById(id).populate('guide').exec();
  }

  async getByTitle(title: string) {
    return CategoriesModel.findOne({ title }).populate('guide').exec();
  }

  async getByDescription(shortDescription: string) {
    return CategoriesModel.findOne({ shortDescription }).populate('guide').exec();
  }

  async getByTitleAndDescription(title: string, shortDescription: string) {
    return CategoriesModel.findOne({ title, shortDescription }).populate('guide').exec();
  }

  async getByGuideId(id: ObjectId | string) {
    return CategoriesModel.find({ guide: id }).populate('guide').exec();
  }

  async delete(category: Categories) {
    return CategoriesModel.findOneAndDelete(category).exec();
  }

  async deleteById(id: ObjectId | string) {
    return CategoriesModel.findOneAndDelete({
      _id: id,
    }).exec();
  }

  async list() {
    return CategoriesModel.find().populate('guide').exec();
  }
}

export default CategoriesRepository;
