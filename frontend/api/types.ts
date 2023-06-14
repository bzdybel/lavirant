import { ProductType } from "../../value-objects";
import { ProductCartType } from "../../value-objects/product-cart";

export interface Email {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export type ProductCart = Omit<ProductCartType, "createdAt">;
export type Product = ProductType;
