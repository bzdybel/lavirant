import { h } from "preact";
import { RoutableProps } from "preact-router";
import { useMutation, useQuery } from "react-query";
import { addProductToCart, getAllProducts } from "./api/api";
import * as bg from "@bgord/frontend";

export const Dashboard = (_: RoutableProps) => {
  const notify = bg.useToastTrigger();
  const t = bg.useTranslations();

  const quantity = bg.useField<number>(1);

  const addProductToCartRequest = useMutation(addProductToCart, {
    onSuccess: () => {
      notify({ message: t("product-added-to-cart") });
    },
    onError: (error: bg.ServerError) => notify({ message: error.message }),
  });

  const products = useQuery("products", getAllProducts);

  return (
    <main
      data-display="flex"
      data-direction="column"
      data-gap="36"
      data-mt="24"
      data-mx="auto"
      data-md-pl="6"
      data-md-pr="3"
      data-max-width="768"
      data-md-max-width="100%"
      data-width="100%"
    >
      <div data-display="flex" data-main="center" data-gap="24">
        <div data-display="flex" data-direction="column">
          {products?.data?.map((product) => (
            <div data-display="flex" data-direction="column">
              <div>{product.name}</div>
              <button
                class="c-button"
                data-variant="secondary"
                type="submit"
                style={{ minWidth: "60px" }}
                onClick={() =>
                  addProductToCartRequest.mutate({
                    productId: product.id,
                    quantity: quantity.value,
                    customerId: "748defaa-3841-4d63-ab5c-fa043d0f53c0",
                  })
                }
              >
                {t("add")}
              </button>
              <input
                id="quantity"
                name="quantity"
                type="number"
                required
                min="0"
                max="100"
                value={quantity.value}
                placeholder={t("quantity")}
                class="c-input"
                data-grow="1"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
