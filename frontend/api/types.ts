import { ProductType } from "../../value-objects";
import { CartType } from "../../value-objects/cart";
import { CartItemType } from "../../value-objects/cart-item";
import { ProductCartType } from "../../value-objects/product-cart";

export interface Email {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export type ProductCart = Omit<ProductCartType, "createdAt">;
export type Product = ProductType;
export type Cart = CartType;
export type CartItem = CartItemType;
