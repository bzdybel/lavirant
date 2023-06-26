import * as bg from "@bgord/node";
import { z } from "zod";

export const CartItemId = bg.Schema.UUID;

export type CartItemIdType = z.infer<typeof CartItemId>;
