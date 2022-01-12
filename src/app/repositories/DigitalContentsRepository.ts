import { DigitalContents } from '@entities/digitalContents';
import { digitalContentModel } from '@models/digitalContent';
import { ObjectId } from 'mongoose';

class digitalContentRepository {
  async create(digitalContent: DigitalContents) {
    return digitalContentModel.create(digitalContent);
  }

  async update(digitalContent: DigitalContents, newDigitalContent: DigitalContents) {
    return digitalContentModel.findOneAndUpdate(digitalContent, newDigitalContent).exec();
  }

  async getById(id: ObjectId) {
    return digitalContentModel.findById(id).exec();
  }

  async getByTitle(title: string) {
    return digitalContentModel.find({ title }).exec();
  }

  async getByDescription(shortDescription: string) {
    return digitalContentModel.find({ shortDescription }).exec();
  }

  async getByTitleAndDescription(title: string, shortDescription: string) {
    return digitalContentModel.find({ title, shortDescription }).exec();
  }

  async getByGuide(id: ObjectId) {
    return digitalContentModel.find({ id }).exec();
  }

  async getByCategory(id: ObjectId) {
    return digitalContentModel.find({ id }).exec();
  }

  async delete(digitalContent: DigitalContents) {
    return digitalContentModel.findOneAndDelete(digitalContent).exec();
  }

  async deleteById(id: ObjectId) {
    return digitalContentModel.findOneAndDelete({
      _id: id,
    }).exec();
  }

  async list() {
    return digitalContentModel.find().exec();
  }
}

export default digitalContentRepository;
