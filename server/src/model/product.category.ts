import mongoose, { Document, Schema, Model } from "mongoose";

//typeDef
export interface ProductBaseDocumentType extends Document {
  name: string;
  slug: string;
}

interface ProductStatics extends Model<ProductBaseDocumentType> {}

//Schema
const productSchema: Schema<ProductBaseDocumentType, ProductStatics> = new mongoose.Schema(
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
    /*     price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    offer: {
      type: Number,
    }, */
  },
  { timestamps: true }
);

//pre

//methods

//export
export default mongoose.model<ProductBaseDocumentType, ProductStatics>("Product", productSchema);
