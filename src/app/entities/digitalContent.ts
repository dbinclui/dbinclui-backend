import { ObjectId } from 'mongoose';
import { Guides } from '@entities/guides';
import { Categories } from '@entities/categories';

export interface digitalContent {
  _id?: ObjectId;
  guide: Guides;
  category?: Categories;
  title: string;
  shortDescription: string;
  upload: File;
}
