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

export async function getAllProducts(): Promise<types.Product[]> {
  return bg
    .API(`/products`, { method: "GET" })
    .then((response) => (response.ok ? response.json() : []));
}
