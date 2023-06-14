import express from "express";
import { db } from "../prisma/script";

export async function AddProductToCart(
  request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  const { customerId, productId, quantity } = request.body;

  try {
    let cart = await db.cart.findFirst({
      where: {
        customerId,
      },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          customerId,
        },
      });
    }

    await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    response.json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
}
