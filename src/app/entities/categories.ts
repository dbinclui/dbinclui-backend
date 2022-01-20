import { ObjectId } from 'mongoose';
import { Guides } from '@entities/guides';

export interface Categories {
  _id?: ObjectId;
  title: string;
  shortDescription: string;
  guide: Guides;
  parentCategory?: Categories;
}
