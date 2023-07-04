import { h } from "preact";
import { RoutableProps } from "preact-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProductToCart, getAllProducts } from "./api/api";
import * as bg from "@bgord/frontend";
import { Layout } from "./uti";

export const Dashboard = (_: RoutableProps) => {
  const notify = bg.useToastTrigger();
  const t = bg.useTranslations();

  const quantity = bg.useField<number>(1);
  const queryClient = useQueryClient();

  const addProductToCartRequest = useMutation(addProductToCart, {
    onSuccess: () => {
      queryClient.refetchQueries("userCart");
      notify({ message: t("product-added-to-cart") });
    },
    onError: (error: bg.ServerError) => notify({ message: error.message }),
  });

  const products = useQuery("products", getAllProducts);

  return (
    <Layout>
      <main data-display="flex" data-direction="column" data-gap="36">
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
                  Add
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
    </Layout>
  );
};
