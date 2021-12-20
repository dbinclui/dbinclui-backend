import { Guides } from '../entities/guides';
import { GuidesModel } from '../models/guides';

export async function criar(guide: Guides) {
  return GuidesModel.create(guide);
}

export async function atualizar(guide: Guides, newGuide: Guides) {
  return GuidesModel.findOneAndUpdate(
    { title: guide.title, content: guide.content },
    newGuide,
  ).exec();
}

export async function consultar(guide: Guides) {
  return GuidesModel.find({
    title: guide.title,
    content: guide.content,
  }).exec();
}

export async function deletar(guide: Guides) {
  return GuidesModel.findOneAndDelete({
    title: guide.title,
    content: guide.content,
  }).exec();
}

export async function listar() {
  return GuidesModel.find().exec();
}
