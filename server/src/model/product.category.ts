import mongoose, { Document, Schema, Model } from "mongoose";

//typeDef
export interface CategoryBaseDocumentType extends Document {
  name: string;
  slug: string;
  parentID: string;
}

interface CategoryStatics extends Model<CategoryBaseDocumentType> {}

//Schema
const categorySchema: Schema<CategoryBaseDocumentType, CategoryStatics> = new mongoose.Schema(
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
    parentID: {
      type: String,
    },
  },
  { timestamps: true }
);

//pre

//methods

//export
export default mongoose.model<CategoryBaseDocumentType, CategoryStatics>("Category", categorySchema);
