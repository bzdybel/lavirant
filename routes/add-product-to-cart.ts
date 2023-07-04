import express from "express";
import * as Repos from "../repositories";
import * as VO from "../value-objects";

export async function AddProductToCart(
  request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  const customerId = VO.CustomerId.parse(request.body.customerId);
  const productId = VO.ProductId.parse(request.body.productId);
  const quantity = VO.Quantity.parse(request.body.quantity);

  try {
    let cart = await Repos.CartRepository.getSingleCart(customerId);
    if (!cart) cart = await Repos.CartRepository.create(customerId);

    let cartItem = await Repos.CartRepository.getSingleCartItem(
      cart.id,
      productId
    );

    if (cartItem) {
      await Repos.CartRepository.updateCartItem(
        cartItem.id,
        cartItem.quantity + quantity
      );
    } else {
      await Repos.CartRepository.createCartItem(cart.id, productId, quantity);
    }

    response.status(201).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
}
