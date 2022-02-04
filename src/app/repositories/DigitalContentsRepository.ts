import { DigitalContents } from '@entities/digitalContents';
import { DigitalContentsModel } from '@models/digitalContents';
import { ObjectId } from 'mongoose';

class digitalContentRepository {
  async create(digitalContent: DigitalContents) {
    return DigitalContentsModel.create(digitalContent);
  }

  async update(id: string, digitalContent: DigitalContents) {
    return DigitalContentsModel.findByIdAndUpdate(id, digitalContent, {
      returnOriginal: false,
    }).exec();
  }

  async get(guideId: ObjectId | string) {
    return DigitalContentsModel.findById(guideId).exec();
  }

  async getById(id: ObjectId | string) {
    return DigitalContentsModel.findById(id).populate('guide').populate('category').exec();
  }

  async getByTitle(title: string) {
    return DigitalContentsModel.find({ title }).populate('guide').populate('category').exec();
  }

  async getByDescription(shortDescription: string) {
    return DigitalContentsModel.find({ shortDescription })
      .populate('guide')
      .populate('category')
      .exec();
  }

  async getByTitleAndDescription(title: string, shortDescription: string) {
    return DigitalContentsModel.find({ title, shortDescription })
      .populate('guide')
      .populate('category')
      .exec();
  }

  async getByGuide(id: ObjectId | string) {
    return DigitalContentsModel.find({ guide: id }).populate('guide').populate('category').exec();
  }

  async getByCategory(id: ObjectId) {
    return DigitalContentsModel.findById(id).populate('guide').populate('category').exec();
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
    return DigitalContentsModel.find().populate('guide').populate('category').exec();
  }
}

export default digitalContentRepository;
