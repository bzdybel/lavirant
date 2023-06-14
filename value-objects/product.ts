import { z } from "zod";
import * as bg from "@bgord/node";

import { ProductId } from "./product-id";
import { ProductName } from "./product-name";
import { ProductDescription } from "./product-description";
import { ProductPrice } from "./product-price";
import { ProductImage } from "./product-image";

export const Product = z.object({
  id: ProductId,
  name: ProductName,
  description: ProductDescription,
  price: ProductPrice,
  image: ProductImage,
  createdAt: bg.Schema.Timestamp,
  updatedAt: bg.Schema.Timestamp,
});

export type ProductType = z.infer<typeof Product>;
