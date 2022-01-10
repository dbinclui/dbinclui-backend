import { model, Schema } from 'mongoose';
import { Categories } from '@entities/categories';

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
