import { ObjectId } from 'mongoose';
import { Guides } from '@entities/guides';

export interface Categories {
  title: string;
  shortDescription: string;
  guide: Guides;
  parentCategory: Categories;
}
