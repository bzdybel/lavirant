import * as bg from "@bgord/frontend";
import { changeProductQuantityInCart } from "../api/api";
import { useMutation, useQueryClient } from "react-query";
import { CartItem } from "../api/types";
import { useEffect } from "preact/hooks";
import { QuantityType } from "../../value-objects";

export const useQuantity = (
  cartItem: CartItem
): {
  onProductQuantityDecrease: VoidFunction;
  onProductQuantityIncrease: VoidFunction;
  quantity: number;
} => {
  const queryClient = useQueryClient();
  const notify = bg.useToastTrigger();

  const cartItemQuantity = bg.useField<QuantityType>(
    "cart-item-quantity",
    cartItem.quantity
  );

  const changeQuantityRequest = useMutation(changeProductQuantityInCart, {
    onSuccess: () => {
      queryClient.refetchQueries("userCart");
    },
    onError: (error: bg.ServerError) => notify({ message: error.message }),
  });

  const quantitySync = bg.useRateLimiter({
    limitMs: bg.Time.Seconds(0.1).toMs(),
    action: () =>
      changeQuantityRequest.mutate({
        cartId: cartItem.cartId,
        cartItemId: cartItem.id,
        quantity: cartItemQuantity.value,
      }),
  });

  const onProductQuantityIncrease = () => {
    cartItemQuantity.set(cartItemQuantity.value + 1);
  };

  const onProductQuantityDecrease = () => {
    if (cartItemQuantity.value <= 1) return;
    cartItemQuantity.set(cartItemQuantity.value - 1);
  };

  useEffect(() => {
    quantitySync();
  }, [cartItemQuantity.value]);

  return {
    onProductQuantityDecrease,
    onProductQuantityIncrease,
    quantity: cartItemQuantity.value,
  };
};
