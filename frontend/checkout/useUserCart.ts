import { useQuery } from "react-query";
import { getUserCart } from "../api/api";
const id = "748defaa-3841-4d63-ab5c-fa043d0f53c0";

export const useUserCart = (customerId?: string) => {
  const { data } = useQuery(["userCart", customerId], () => getUserCart(id));

  const totalPrice =
    data?.items
      .reduce(
        (accumulator, item) => accumulator + item.product.price * item.quantity,
        0
      )
      .toFixed(2) || "0";

  return {
    data,
    totalPrice,
  };
};
