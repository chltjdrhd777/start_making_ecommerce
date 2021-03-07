import mongoose, { Document, Schema, Model } from "mongoose";

export interface PageBaseDocumentType extends Document {}

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    banners: [
      {
        img: String,
        href: String,
      },
    ],
    products: [
      {
        img: String,
        href: String,
      },
    ],
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<PageBaseDocumentType>("Part", pageSchema);
