import { z } from "zod";

export const ProductImage = z.string().min(1);
export type ProductImageType = z.infer<typeof ProductImage>;
