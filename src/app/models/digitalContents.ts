import { model, Schema } from 'mongoose';
import { DigitalContents } from '@entities/digitalContents';

const DigitalContentSchema = new Schema<DigitalContents>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  guide: { type: Schema.Types.ObjectId, ref: 'Guides', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  filePath: { type: String, required: true },
});

export const DigitalContentsModel = model<DigitalContents>(
  'DigitalContent',
  DigitalContentSchema,
  'digitalContent',
);
export default DigitalContentsModel;
