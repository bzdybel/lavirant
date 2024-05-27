import * as types from "./types";
import * as bg from "@bgord/frontend";

export async function sendEmail(email: types.Email) {
  return bg.API("/contact", {
    method: "POST",
    body: JSON.stringify(email),
  });
}

export async function addProductToCart(product: types.NewProductInCart) {
  return bg.API("/add-product-to-cart", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function removeProductFromCart(
  product: Pick<types.CartItem, "cartId" | "productId">
) {
  return bg.API("/remove-product-from-cart", {
    method: "POST",
    body: JSON.stringify(product),
  });
}
export async function getAllProducts(): Promise<types.Product[]> {
  return bg
    .API(`/products`, { method: "GET" })
    .then((response) => (response.ok ? response.json() : []));
}

export async function getUserCart(customerId: string): Promise<types.Cart> {
  return bg
    .API(`/user-cart`, {
      method: "POST",
      body: JSON.stringify({ customerId }),
    })
    .then((response) => (response.ok ? response.json() : []));
}

export async function changeProductQuantityInCart(cartItem: {
  cartId: types.CartItem["cartId"];
  cartItemId: types.CartItem["id"];
  quantity: types.CartItem["quantity"];
}): Promise<types.Cart> {
  return bg
    .API(`/change-product-quantity-in-cart`, {
      method: "POST",
      body: JSON.stringify({ cartItem }),
    })
    .then((response) => (response.ok ? response.json() : []));
}
