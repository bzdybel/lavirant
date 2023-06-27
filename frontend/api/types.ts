import { ProductCartType } from "../../value-objects/product-cart";
import type { CustomerIdType, ProductType } from "../../value-objects";

export interface Email {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export type ProductCart = Omit<ProductCartType, "createdAt">;
export type Product = Omit<ProductType, "createdAt">;
export type CustomerId = CustomerIdType;
