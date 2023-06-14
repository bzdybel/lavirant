import { z } from "zod";

export const ProductName = z.string().min(1).max(100);
export type ProductNameType = z.infer<typeof ProductName>;
