import { ObjectId } from 'mongoose';
import { Categories } from './categories';

export interface Guides {
  _id?: ObjectId;
  title: string;
  content: string;
  categories: Categories[];
}
