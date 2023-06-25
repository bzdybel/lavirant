import { h } from "preact";
import * as Icons from "iconoir-react";
import * as bg from "@bgord/frontend";
import { CartItem } from "../api/types";

import { useMutation } from "react-query";
import { removeProductFromCart } from "../api/api";
interface CheckoutSummaryItemProps {
  cart: CartItem;
}

export const CheckoutSummaryItem = ({ cart }: CheckoutSummaryItemProps) => {
  const t = bg.useTranslations();
  const notify = bg.useToastTrigger();

  const removeProductFromCartRequest = useMutation(removeProductFromCart, {
    onError: (error: bg.ServerError) => notify({ message: error.message }),
  });

  return (
    <div
      data-cross="center"
      data-display="flex"
      data-width="100%"
      data-main="between"
    >
      <div
        data-display="flex"
        data-md-direction="row"
        data-wrap="nowrap"
        data-gap="3"
        data-cross="center"
        data-width="100%"
        style={{ gap: "20px" }}
      >
        <img
          data-bg="gray-600"
          data-br="4"
          src={cart.product.image}
          alt={""}
          style={{ width: "50px", height: "50px" }}
        />

        <div data-display="flex" data-direction="column" data-width="100%">
          <div data-display="flex" data-direction="column">
            <label data-fw="900" data-color="orange-800">
              {cart.product.name}
            </label>
            <label data-color="green-800">{cart.product.description}</label>
          </div>
          <div
            data-cross="center"
            data-display="flex"
            data-width="100%"
            data-main="between"
          >
            <div
              data-display="flex"
              data-direction="row"
              data-cross="center"
              style={{ gap: "10px" }}
            >
              <button
                type="submit"
                title={t("remove")}
                class="c-button"
                data-variant="bare"
                data-color="white"
                onClick={() =>
                  removeProductFromCartRequest.mutate({
                    productId: cart.product.id,
                    cartId: cart.cartId,
                  })
                }
              >
                <Icons.Trash width="24" height="24" data-color="white" />
              </button>
              <label data-color="gray-300">
                {`${t("currency")} ${cart.product.price.toString()}`}
              </label>
            </div>
            <div data-cross="center" data-display="flex" data-main="between">
              <button
                type="button"
                className="c-button"
                title=""
                data-variant="primary"
                data-display="flex"
                data-main="center"
                data-cross="center"
                data-wrap="nowrap"
                data-m="12"
                disabled={cart.quantity <= 1}
              >
                <Icons.Minus height="24" width="24" />
              </button>
              <label data-color="white">{cart.quantity}</label>
              <button
                type="button"
                title=""
                className="c-button"
                data-variant="primary"
                data-display="flex"
                data-main="center"
                data-cross="center"
                data-wrap="nowrap"
                data-m="12"
              >
                <Icons.Plus height="24" width="24" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <button
        type="submit"
        title={t("article.delete")}
        class="c-button"
        data-variant="bare"
      >
        <Icons.RemoveSquare width="24" height="24" />
      </button> */}
    </div>
  );
};
