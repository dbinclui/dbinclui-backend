import { model, Schema } from 'mongoose';
import { Guides } from '../entities/guides';

const GuidesSchema = new Schema<Guides>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export const GuidesModel = model<Guides>('Guides', GuidesSchema, 'guides');
