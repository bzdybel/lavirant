import * as VO from "../value-objects";
import { db } from "../infra/db";

export class CartRepository {
  static async create(customerId: VO.CustomerIdType) {
    return await db.cart.create({
      data: {
        customerId,
      },
    });
  }

  static async getSingleCart(customerId: VO.CustomerIdType) {
    return await db.cart.findFirst({
      where: {
        customerId,
      },
    });
  }

  static async getSingleCartItem(
    cartId: VO.CartIdType,
    productId: VO.ProductIdType
  ) {
    return await db.cartItem.findFirst({
      where: {
        cartId,
        productId,
      },
    });
  }

  static async createCartItem(
    cartId: VO.CartIdType,
    productId: VO.ProductIdType,
    quantity: VO.QuantityType
  ) {
    await db.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }

  static async updateCartItem(
    cartId: VO.CartIdType,
    cartItemQuantity: VO.QuantityType,
    quantity: VO.QuantityType
  ) {
    await db.cartItem.update({
      where: {
        id: cartId,
      },
      data: {
        quantity: cartItemQuantity + quantity,
      },
    });
  }
}
