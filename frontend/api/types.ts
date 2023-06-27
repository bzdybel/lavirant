import { ProductCartType } from "../../value-objects/product-cart";
import type {
  CustomerIdType,
  ProductIdType,
  ProductType,
  QuantityType,
} from "../../value-objects";

export interface Email {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export type ProductCart = Omit<ProductCartType, "createdAt">;
export type Product = Omit<ProductType, "createdAt">;
export type ProductId = ProductIdType;
export type CustomerId = CustomerIdType;
export type Quantity = QuantityType;

export type NewProduct = {
  productId: ProductId;
  quantity: Quantity;
  customerId: CustomerId;
};
