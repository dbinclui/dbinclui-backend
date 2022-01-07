import { ObjectId } from 'mongoose';
import { Guides } from './guides';

export interface Categories {
  _id: ObjectId;
  _idGuides: ObjectId;
  _idParent?: ObjectId;
  title: string;
  shortDescription: string;
}