import { Tab, Tabs } from "../ui";
import { Cart, PaymentOption, ShippingOption } from "./Cart";

import { h, FunctionComponent } from "preact";
import { RoutableProps } from "preact-router";
import { ShippingForm } from "./ShippingForm";
import * as bg from "@bgord/frontend";
import { Summary } from "./Summary";

export const Checkout: FunctionComponent<RoutableProps> = (
  _: RoutableProps
) => {
  const activeTab = bg.useField<number>("activeTab", 1);
  const shippingOption = bg.useField<ShippingOption>(
    "shippingOption",
    ShippingOption.DPD
  );

  const paymentOption = bg.useField<PaymentOption>(
    "paymentOption",
    PaymentOption.Przelewy24
  );

  const handleTabClick = (tabId: number) => {
    activeTab.set(tabId);
  };

  const tabsData: Tab[] = [
    {
      id: 1,
      title: "1. Koszyk",
      content: (
        <Cart
          handleTabClick={handleTabClick}
          shippingOption={shippingOption}
          paymentOption={paymentOption}
        />
      ),
    },
    {
      id: 2,
      title: "2. Adres dostawy",
      content: <ShippingForm handleTabClick={handleTabClick} />,
    },
    {
      id: 3,
      title: "3. Podsumowanie",
      content: (
        <Summary
          shippingOption={shippingOption.value}
          paymentOption={paymentOption.value}
        />
      ),
    },
  ];

  return (
    <Tabs
      tabs={tabsData}
      handleTabClick={handleTabClick}
      activeTab={activeTab.value}
    />
  );
};
