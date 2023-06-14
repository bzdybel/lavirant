import { z } from "zod";
import * as bg from "@bgord/node";

import { ProductId } from "./product-id";
import { Quantity } from "./quantity";
import { CustomerId } from "./customer-id";

export const Product = z.object({
  productId: ProductId,
  createdAt: bg.Schema.Timestamp,
  quantity: Quantity,
  customerId: CustomerId,
});

export type ProductType = z.infer<typeof Product>;
