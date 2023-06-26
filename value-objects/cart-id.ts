import * as bg from "@bgord/node";
import { z } from "zod";

export const CartId = bg.Schema.UUID;

export type CartIdType = z.infer<typeof CartId>;
