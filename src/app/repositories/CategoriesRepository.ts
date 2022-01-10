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
    return CategoriesModel.find({ title }).exec();
  }

  async getByDescription(shortDescription: string) {
    return CategoriesModel.find({ shortDescription }).exec();
  }

  async getByTitleAndDescription(title: string, shortDescription: string) {
    return CategoriesModel.find({ title, shortDescription }).exec();
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
