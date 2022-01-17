import { ObjectId } from 'mongoose';
import { Guides } from '@entities/guides';
import { Categories } from '@entities/categories';

export interface DigitalContents {
  _id?: ObjectId;
  guide: Guides;
  category?: Categories | null;
  title: string;
  shortDescription: string;
  filePaths: string[];
}
