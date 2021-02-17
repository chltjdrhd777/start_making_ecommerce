import mongoose, { Document, Schema, Model } from "mongoose";

//typeDef
export interface ProductBaseDocumentType extends Document {
  name: string;
  slug: string;
  price: number;
  description: string;
  offer: number;
  productPictures: { img: string }[];
  updatedAt: Date;
  createdBy: any;
  review: any;
  category: any;
  quantity: number;
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
    price: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    offer: {
      type: Number,
    },
    quantity: { type: Number },
    productPictures: [{ img: { type: String } }],
    review: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User", review: String }],
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
    updatedAt: Date,
  },
  { timestamps: true }
);

//pre

//methods

//export
export default mongoose.model<ProductBaseDocumentType, ProductStatics>("Product", productSchema);
