import { h } from "preact";
import * as Icons from "iconoir-react";
import * as bg from "@bgord/frontend";
import { CartItem } from "../api/types";
import { useMutation, useQueryClient } from "react-query";
import { removeProductFromCart } from "../api/api";
import { useQuantity } from "./useQuantity";
interface CheckoutSummaryItemProps {
  cartItem: CartItem;
}

export const CheckoutSummaryItem = ({ cartItem }: CheckoutSummaryItemProps) => {
  const t = bg.useTranslations();
  const notify = bg.useToastTrigger();
  const queryClient = useQueryClient();

  const { onProductQuantityIncrease, onProductQuantityDecrease, quantity } =
    useQuantity(cartItem);

  const removeProductFromCartRequest = useMutation(removeProductFromCart, {
    onSuccess: () => {
      queryClient.refetchQueries("userCart");
    },
    onError: (error: bg.ServerError) => notify({ message: error.message }),
  });

  return (
    <div
      data-cross="center"
      data-display="flex"
      data-width="100%"
      data-main="between"
      data-bg="gray-800"
      data-p="24"
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
          src={cartItem.product.image}
          alt={""}
          style={{ aspectRatio: "1", maxWidth: "100px" }}
        />

        <div data-display="flex" data-direction="column" data-width="100%">
          <div data-display="flex" data-direction="column">
            <label data-fw="900" data-color="white">
              {cartItem.product.name}
            </label>
            <label data-color="white">{cartItem.product.description}</label>
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
                    productId: cartItem.product.id,
                    cartId: cartItem.cartId,
                  })
                }
              >
                <Icons.Trash width="24" height="24" data-color="white" />
              </button>
              <label data-color="gray-300">
                {`${t("currency")} ${cartItem.product.price.toString()}`}
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
                onClick={onProductQuantityDecrease}
                disabled={cartItem.quantity <= 1}
              >
                <Icons.Minus height="24" width="24" />
              </button>
              <label data-color="white">{quantity}</label>
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
                data-color="gray-800"
                onClick={onProductQuantityIncrease}
              >
                <Icons.Plus height="24" width="24" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
