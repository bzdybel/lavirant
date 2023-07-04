import * as VO from "../value-objects";
import { db } from "../infra/db";

export class CartRepository {
  static async create(customerId: VO.CustomerIdType) {
    return db.cart.create({
      data: {
        customerId,
      },
    });
  }

  static async getSingleCart(customerId: VO.CustomerIdType) {
    return db.cart.findFirst({
      where: {
        customerId,
      },
    });
  }

  static async getSingleCartItem(
    cartId: VO.CartIdType,
    productId: VO.ProductIdType
  ) {
    return db.cartItem.findFirst({
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
    return db.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }

  static async updateCartItem(
    cartItemId: VO.CartIdType,
    quantity: VO.QuantityType
  ) {
    return db.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
  }
}
