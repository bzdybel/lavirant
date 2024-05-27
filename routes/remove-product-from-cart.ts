import express from "express";
import { db } from "../infra/db";

export async function RemoveProductFromCart(
  request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  try {
    const { cartId, productId } = request.body;

    const cart = await db.cart.findUnique({ where: { id: cartId } });
    if (!cart) {
      return response
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const cartItem = await db.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (!cartItem) {
      return response
        .status(404)
        .json({ success: false, message: "Product not found in the cart" });
    }

    await db.cartItem.delete({ where: { id: cartItem.id } });
    response.json({
      success: true,
    });
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Failed to remove product from cart" });
  }
}
