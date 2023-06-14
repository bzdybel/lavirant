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

export async function addProductToCart(product: types.ProductCart) {
  return _api("/add-product-to-cart", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function getAllProducts(): Promise<types.Product[]> {
  return _api(`/products`, { method: "GET" }).then((response) =>
    response.ok ? response.json() : []
  );
}
