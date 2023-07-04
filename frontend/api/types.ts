import type {
  CustomerIdType,
  ProductType,
  CartType,
  CartItemType,
  ProductCartType,
} from "../../value-objects";

export interface Email {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export type ProductCart = Omit<ProductCartType, "createdAt">;
export type Cart = CartType;
export type CartItem = CartItemType;
export type Product = Omit<ProductType, "createdAt">;
export type CustomerId = CustomerIdType;
