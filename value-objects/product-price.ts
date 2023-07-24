import { z } from "zod";

export const ProductPrice = z.number().int().positive();
export type ProductPriceType = z.infer<typeof ProductPrice>;
