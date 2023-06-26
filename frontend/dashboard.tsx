import { h } from "preact";
import { RoutableProps } from "preact-router";
import { useMutation } from "react-query";
import { addProductToCart } from "./api/api";
import * as bg from "@bgord/frontend";

export const Dashboard = (_: RoutableProps) => {
  const notify = bg.useToastTrigger();
  const t = bg.useTranslations();

  const addProductToCartRequest = useMutation(addProductToCart, {
    onSuccess: () => {
      notify({ message: t("product-added-to-cart") });
    },
    onError: (error: bg.ServerError) => notify({ message: error.message }),
  });

  return (
    <button
      class="c-button"
      data-variant="secondary"
      type="submit"
      style={{ minWidth: "60px" }}
      onClick={() =>
        addProductToCartRequest.mutate({
          productId: "89ada1b0-6e68-46b1-8134-24349f0bfcbc",
          quantity: 1,
        })
      }
    >
      Add
    </button>
  );
};
