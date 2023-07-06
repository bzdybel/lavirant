import * as bg from "@bgord/node";
import { z } from "zod";

export const ProductInCartId = bg.Schema.UUID;

export type ProductInCartIdType = z.infer<typeof ProductInCartId>;
