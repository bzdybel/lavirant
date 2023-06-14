import { z } from "zod";

export const Quantity = z.number().min(1);

export type QuantityType = z.infer<typeof Quantity>;
