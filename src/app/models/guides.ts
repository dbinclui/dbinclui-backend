import { model, Schema } from 'mongoose';
import { Guides } from '../entities/guides';

const GuidesSchema = new Schema<Guides>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

<<<<<<< HEAD:src/app/models/guides.ts
export const GuidesModel = model<Guides>('Guides', GuidesSchema, 'guides');
=======
const GuidesModel = model<Guides>('Guides', GuidesSchema, 'guides');

>>>>>>> e9a37f5221616fa89d59eb774477e090ae13f153:src/app/models/modelGuides.ts
export default GuidesModel;
