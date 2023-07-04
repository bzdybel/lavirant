import * as types from "./types";
import { ServerError } from "./server-error";

export const _api: typeof fetch = (input, init) =>
  fetch(input, {
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",

      "time-zone-offset": new Date().getTimezoneOffset().toString(),
    },
    redirect: "follow",
    ...init,
  })
    .then(ServerError.extract)
    .catch(ServerError.handle);

export async function sendEmail(email: types.Email) {
  return _api("/contact", {
    method: "POST",
    body: JSON.stringify(email),
  });
}

export async function addProductToCart(
  product: types.Product & { customerId: types.CustomerId }
) {
  return _api("/add-product-to-cart", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function removeProductFromCart(
  product: Pick<types.CartItem, "cartId" | "productId">
) {
  return _api("/remove-product-from-cart", {
    method: "POST",
    body: JSON.stringify(product),
  });
}
export async function getAllProducts(): Promise<types.Product[]> {
  return _api(`/products`, { method: "GET" }).then((response) =>
    response.ok ? response.json() : []
  );
}

export async function getUserCart(customerId: string): Promise<types.Cart> {
  return _api(`/user-cart`, {
    method: "POST",
    body: JSON.stringify({ customerId }),
  }).then((response) => (response.ok ? response.json() : []));
}

export async function changeProductQuantityInCart(cartItem: {
  cartId: types.CartItem["cartId"];
  cartItemId: types.CartItem["id"];
  quantity: types.CartItem["quantity"];
}): Promise<types.Cart> {
  return _api(`/change-product-quantity-in-cart`, {
    method: "POST",
    body: JSON.stringify({ cartItem }),
  }).then((response) => (response.ok ? response.json() : []));
}
