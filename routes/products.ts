import express from "express";
import { db } from "../prisma/script";

export async function Products(
  _request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  try {
    const products = await db.product.findMany();

    response.json(products);
  } catch (error) {
    response.status(500).json({ error: "Failed to retrieve products" });
  }
}
