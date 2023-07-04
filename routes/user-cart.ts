import express from "express";
import { db } from "../infra/db";

export async function UserCart(
  request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  try {
    const { customerId } = request.body.customerId;

    const cart = await db.cart.findFirst({
      where: {
        customerId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    response.json(cart);
  } catch (error) {
    response.status(500).json({ error: "Failed to retrieve products" });
  }
}
