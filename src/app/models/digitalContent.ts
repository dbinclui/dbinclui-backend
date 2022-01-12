import { model, Schema } from 'mongoose';
import { digitalContent } from '@entities/digitalContent';

const DigitalContentSchema = new Schema<digitalContent>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  guide: { type: Schema.Types.ObjectId, ref: 'Guides', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  filePath: { type: String, required: true },
});

export const digitalContentModel = model<digitalContent>(
  'DigitalContent',
  DigitalContentSchema,
  'digitalContent',
);
export default digitalContentModel;
