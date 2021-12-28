import { ObjectId } from 'mongoose';

export interface Guides {
  _id?: ObjectId;
  title: string;
  content: string;
}
