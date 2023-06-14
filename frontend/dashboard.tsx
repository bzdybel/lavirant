import { h } from "preact";
import { RoutableProps } from "preact-router";
import { useMutation } from "react-query";
import { addProductToCart } from "./api/api";
import * as bg from "@bgord/frontend";

export const Dashboard = (_: RoutableProps) => {
  const notify = bg.useToastTrigger();

  const addProductToCartRequest = useMutation(addProductToCart, {
    onSuccess: () => {
      notify({ message: "Product added to the cart" });
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
          customerId: "748defaa-3841-4d63-ab5c-fa043d0f53c0",
        })
      }
    >
      Add
    </button>
  );
};
