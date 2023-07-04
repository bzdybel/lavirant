import { z } from "zod";
import * as bg from "@bgord/node";

import { ProductId } from "./product-id";
import { Product } from "./product";
import { CartId } from "./cart-id";
import { Quantity } from "./quantity";
import { CartItemId } from "./cart-item-id";

export const CartItem = z.object({
  cartId: CartId,
  createdAt: bg.Schema.Timestamp,
  updatedAt: bg.Schema.Timestamp,
  product: Product,
  quantity: Quantity,
  id: CartItemId,
  productId: ProductId,
});

export type CartItemType = z.infer<typeof CartItem>;
