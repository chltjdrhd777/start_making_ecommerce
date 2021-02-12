import mongoose, { Document, Schema, Model } from "mongoose";

export interface CategoryBaseDocumentType extends Document {
  name: string;
  slug: string;
  parentId?: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CategoryBaseDocumentType>("Category", categorySchema);
