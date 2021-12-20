import { Guides } from '../entities/guides';
import { GuidesModel } from '../models/guides';

class GuidesRepository {
  async create(guide: Guides) {
    return GuidesModel.create(guide);
  }

  async update(guide: Guides, newGuide: Guides) {
    return GuidesModel.findOneAndUpdate(
      { title: guide.title, content: guide.content },
      newGuide,
    ).exec();
  }

  async get(guide: Guides) {
    return GuidesModel.find({
      title: guide.title,
      content: guide.content,
    }).exec();
  }

  async delete(guide: Guides) {
    return GuidesModel.findOneAndDelete({
      title: guide.title,
      content: guide.content,
    }).exec();
  }

  async list() {
    return GuidesModel.find().exec();
  }
}

export default GuidesRepository;
