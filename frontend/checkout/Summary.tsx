import { h } from "preact";
import { Layout } from "../uti";
import { useUserCart } from "./useUserCart";
import {
  CheckoutItem,
  PaymentOption,
  ShippingOption,
  cartStyles,
} from "./Cart";

interface SummaryProps {
  shippingOption: ShippingOption;
  paymentOption: PaymentOption;
}

export const Summary = ({ shippingOption, paymentOption }: SummaryProps) => {
  const { data, totalPrice } = useUserCart();

  return (
    <Layout>
      <div style={styles.container}>
        <table style={cartStyles.table} data-mb="12">
          <thead data-variant="secondary">
            <tr>
              <th style={cartStyles.tableHeader}>Product</th>
              <th style={cartStyles.tableHeader}>Details</th>
              <th style={cartStyles.tableHeader}>Price</th>
              <th style={cartStyles.tableHeader}>Value</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <CheckoutItem cartItem={item} readonly />
            ))}
          </tbody>
        </table>
        <div style={cartStyles.flexContainer}>
          <div style={cartStyles.column}>
            <h4 style={cartStyles.header}>Wybrany rodzaj wysyłki</h4>
            {shippingOption}
          </div>
          <div style={cartStyles.column}>
            <h4 style={cartStyles.header}>Wybrana forma płatności</h4>
            {paymentOption}
          </div>
          <div style={cartStyles.column}>
            <h4 style={cartStyles.header}>Adres dostawy</h4>
          </div>
          <div style={cartStyles.column}>
            <h4 style={cartStyles.header}>Do zapłaty</h4>
            {totalPrice}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "20px",
  },
};
