import type { CustomerIdType, ProductType } from "../../value-objects";

export interface Email {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export type Product = Omit<ProductType, "createdAt">;
export type CustomerId = CustomerIdType;
