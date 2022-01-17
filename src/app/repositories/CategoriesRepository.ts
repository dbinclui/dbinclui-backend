import { Categories } from '@entities/categories';
import { CategoriesModel } from '@models/categories';
import { ObjectId } from 'mongoose';

class CategoriesRepository {
  async create(category: Categories) {
    return CategoriesModel.create(category);
  }

  async update(category: Categories, newGuide: Categories) {
    return CategoriesModel.findOneAndUpdate(category, newGuide).exec();
  }

  async getById(id: ObjectId) {
    return CategoriesModel.findById(id).exec();
  }

  async getByTitle(title: string) {
    return CategoriesModel.findOne({ title }).exec();
  }

  async getByDescription(shortDescription: string) {
    return CategoriesModel.findOne({ shortDescription }).exec();
  }

  async getByTitleAndDescription(title: string, shortDescription: string) {
    return CategoriesModel.findOne({ title, shortDescription }).exec();
  }

  async getByGuideId(id: ObjectId) {
    return CategoriesModel.find({ guide: id }).exec();
  }

  async delete(category: Categories) {
    return CategoriesModel.findOneAndDelete(category).exec();
  }

  async deleteById(id: ObjectId) {
    return CategoriesModel.findOneAndDelete({
      _id: id,
    }).exec();
  }

  async list() {
    return CategoriesModel.find().exec();
  }
}

export default CategoriesRepository;
