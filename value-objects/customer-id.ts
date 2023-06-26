import * as bg from "@bgord/node";
import { z } from "zod";

export const CustomerId = bg.Schema.UUID;
export type CustomerIdType = z.infer<typeof CustomerId>;
