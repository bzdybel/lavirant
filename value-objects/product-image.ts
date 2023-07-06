import { z } from "zod";

export const ProductImage = z.string().url();
export type ProductImageType = z.infer<typeof ProductImage>;
