import { model, Schema, SchemaTypes, ObjectId } from 'mongoose';
import { Categories } from '@entities/categories';
import { Guides } from '@entities/guides';

const CategoriesSchema = new Schema<Categories>(
  {
    title: String,
    shortDescription: String,
    guide: { type: Schema.Types.ObjectId, ref: 'Guides' },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Categories' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export const CategoriesModel = model<Categories>('Categories', CategoriesSchema, 'categories');
export default CategoriesModel;
