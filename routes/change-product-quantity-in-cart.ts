import express from "express";
import { db } from "../infra/db";

export async function ChangeProductQuantityInCart(
  request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  try {
    const { cartItem } = request.body;

    // Extract the cartItem details
    const { cartId, cartItemId, quantity } = cartItem;

    // Retrieve the existing cart item from the database
    const existingCartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!existingCartItem) {
      return response
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    // Update the quantity of the existing cart item
    await db.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    // Retrieve the updated cart
    const updatedCart = await db.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });

    return response.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Failed to change product quantity in cart",
    });
  }
}
