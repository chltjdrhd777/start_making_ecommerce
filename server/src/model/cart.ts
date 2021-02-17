import mongoose, { Document, Schema, Model } from "mongoose";

export interface CartBaseDocumentType extends Document {
  user: string;
  cartItems: { product: string; quantity: number; price: number }[];
}

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        product: { type: mongoose.SchemaTypes.ObjectId, ref: "Product", requried: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<CartBaseDocumentType>("Cart", cartSchema);
