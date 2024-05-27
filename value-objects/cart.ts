import { z } from "zod";
import * as bg from "@bgord/node";

import { CartId } from "./cart-id";
import { CustomerId } from "./customer-id";
import { CartItem } from "./cart-item";

export const Cart = z.object({
  createdAt: bg.Schema.Timestamp,
  updatedAt: bg.Schema.Timestamp,
  customerId: CustomerId,
  id: CartId,
  items: z.array(CartItem),
});

export type CartType = z.infer<typeof Cart>;
