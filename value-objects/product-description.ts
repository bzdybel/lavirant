import { z } from "zod";

export const ProductDescription = z.string().min(1).max(1000);
export type ProductDescriptionType = z.infer<typeof ProductDescription>;
