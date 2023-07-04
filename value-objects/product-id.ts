import * as bg from "@bgord/node";
import { z } from "zod";

export const ProductId = bg.Schema.UUID;

export type ProductIdType = z.infer<typeof ProductId>;
