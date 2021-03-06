import { CartBaseDocumentType } from "./../model/cart";
import Cart from "../model/cart";
import { UserBaseDocumentType } from "../model/UserModel";
import { Request } from "express";

interface CustomCartRequest extends Request<{}, {}, { item: { product: string; quantity: number; price: number } }> {
  userData: UserBaseDocumentType;
}

const createCart = (req: CustomCartRequest, res) => {
  Cart.findOne({ user: req.userData._id }, undefined, undefined, (err, doc) => {
    if (err) return res.status(400).json({ err });
    if (doc) {
      //if cart already exists && same item is exist already, change the quantity
      const targetProduct = req.body.item.product;
      const isItemAdded = doc.cartItems.find((e) => e.product == targetProduct);
      let condition, action;

      if (isItemAdded) {
        condition = { user: req.userData._id, cartItems: { $elemMatch: { product: targetProduct } } };
        action = {
          $set: { "cartItems.$.quantity": isItemAdded.quantity + req.body.item.quantity },
        };
      } else {
        (condition = { user: req.userData._id }),
          (action = {
            $push: {
              cartItems: req.body.item,
            },
          });
      }

      Cart.findOneAndUpdate(condition, action, { new: true }, (err, doc) => {
        if (err) return res.status(400).json({ err });
        res.status(200).json({ doc });
      });
    } else {
      //if there is not a cart, make a new cart
      const cart = new Cart({
        user: req.userData._id,
        cartItems: [req.body.item],
      });

      cart.save(undefined, (err, doc) => {
        if (err) return res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, doc });
      });
    }
  });
};

export { createCart };
