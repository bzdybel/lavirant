import { Fragment, h } from "preact";

import * as Icons from "iconoir-react";
import * as bg from "@bgord/frontend";
import { CheckoutSummaryItem } from "./CheckoutSummaryItem";
import { Link } from "../uti";
import { useUserCart } from "./useUserCart";

interface CheckoutSummaryPanelProps {
  disable: bg.UseToggleReturnType["disable"];
}

export const CheckoutSummaryPanel = ({
  disable,
}: CheckoutSummaryPanelProps) => {
  const t = bg.useTranslations();
  const { data, totalPrice } = useUserCart();

  return (
    <Fragment>
      <div
        data-display="flex"
        data-direction="column"
        data-main="between"
        data-height="100%"
        data-wrap="nowrap"
      >
        <div
          data-display="flex"
          data-cross="main"
          data-width="100%"
          data-main="between"
          data-py="24"
          data-px="12"
          data-wrap="nowrap"
          data-bg="gray-800"
          data-shadow
        >
          <label
            htmlFor="tracker.name"
            class="c-label"
            data-fw="700"
            data-fs="32"
            data-lh="36"
            data-color="white"
          >
            {`${t("cart-value")}: ${t("currency")} ${totalPrice}`}
          </label>
          <button
            data-display="flex"
            data-main="end"
            width="100%"
            type="button"
            class="c-button"
            data-variant="bare"
            title=""
            onClick={disable}
          >
            <Icons.Cancel data-color="white" height="30" width="30" />
          </button>
        </div>
        <div
          data-py="36"
          data-px="12"
          data-display="flex"
          data-direction="column"
          data-width="100%"
          data-wrap="nowrap"
          style={{
            height: "inherit",
            overflowY: "auto",
          }}
        >
          <div data-direction="column">
            <div
              data-display="flex"
              data-direction="column"
              data-cross="start"
              data-ml="auto"
              data-wrap="nowrap"
              style={{
                gap: "20px",
                overflowY: "auto",
              }}
            >
              {data?.items.map((cart) => {
                return <CheckoutSummaryItem cartItem={cart} />;
              })}
            </div>
          </div>
        </div>
        <div
          data-shadow
          data-width="100%"
          data-bg="gray-800"
          data-py="24"
          data-px="12"
          data-display="flex"
          data-main="end"
        >
          <Link
            data-color="white"
            data-transform="uppercase"
            data-py="12"
            data-px="24"
            data-bg="gray-800"
            href={`/checkout`}
            onClick={disable}
          >
            Checkout
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
