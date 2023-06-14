import { z } from "zod";

export const ProductPrice = z.number().positive();
export type ProductPriceType = z.infer<typeof ProductPrice>;
