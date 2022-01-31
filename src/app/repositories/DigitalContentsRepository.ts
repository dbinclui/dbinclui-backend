import { DigitalContents } from '@entities/digitalContents';
import { DigitalContentsModel } from '@models/digitalContents';
import { ObjectId } from 'mongoose';

class digitalContentRepository {
  async create(digitalContent: DigitalContents) {
    return DigitalContentsModel.create(digitalContent);
  }

  async update(digitalContent: DigitalContents, newDigitalContent: DigitalContents) {
    return DigitalContentsModel.findOneAndUpdate(digitalContent, newDigitalContent).exec();
  }

  async getById(id: ObjectId) {
    return DigitalContentsModel.findById(id).exec();
  }

  async getByTitle(title: string) {
    return DigitalContentsModel.find({ title }).exec();
  }

  async getByDescription(shortDescription: string) {
    return DigitalContentsModel.find({ shortDescription }).exec();
  }

  async getByTitleAndDescription(title: string, shortDescription: string) {
    return DigitalContentsModel.find({ title, shortDescription }).exec();
  }

  async getByGuide(id: ObjectId | string) {
    return DigitalContentsModel.find({ guide: id }).exec();
  }

  async getByCategory(id: ObjectId) {
    return DigitalContentsModel.findById(id).exec();
  }

  async delete(digitalContent: DigitalContents) {
    return DigitalContentsModel.findOneAndDelete(digitalContent).exec();
  }

  async deleteById(id: ObjectId) {
    return DigitalContentsModel.findOneAndDelete({
      _id: id,
    }).exec();
  }

  async list() {
    return DigitalContentsModel.find().exec();
  }
}

export default digitalContentRepository;
