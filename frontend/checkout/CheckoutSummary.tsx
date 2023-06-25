import { h } from "preact";

import * as Icons from "iconoir-react";
import { useQuery } from "react-query";
import { getUserCart } from "../api/api";
import * as bg from "@bgord/frontend";
import { CheckoutSummaryItem } from "./CheckoutSummaryItem";

interface CheckoutSummaryProps {
  disable: bg.UseToggleReturnType["disable"];
}

const useUserCart = (customerId: string) => {
  return useQuery(["userCart", customerId], () => getUserCart(customerId));
};

export const CheckoutSummary = ({ disable }: CheckoutSummaryProps) => {
  const t = bg.useTranslations();
  const id = "748defaa-3841-4d63-ab5c-fa043d0f53c0";
  const { data } = useUserCart(id);

  return (
    <div
      data-display="flex"
      data-main="end"
      data-py="6"
      data-px="12"
      data-direction="column"
    >
      <button
        data-display="flex"
        data-main="end"
        type="button"
        class="c-button"
        data-variant="bare"
        onClick={disable}
      >
        <Icons.Cancel data-color="white" height="30" width="30" />
      </button>
      <div data-direction="column">
        <label
          htmlFor="tracker.name"
          class="c-label"
          data-fw="700"
          data-fs="32"
        >
          {t("checkout")}
        </label>

        <div
          data-display="flex"
          data-direction="column"
          data-cross="start"
          data-ml="auto"
          data-mt="48"
          style={{ gap: "20px" }}
        >
          {data?.items.map((cart) => {
            return <CheckoutSummaryItem cart={cart} />;
          })}
        </div>
      </div>
    </div>
  );
};
