import { h } from "preact";
import { RoutableProps } from "preact-router";
import { useUserCart } from "./useUserCart";
import { Layout } from "../uti";
import { useQuantity } from "./useQuantity";
import * as Icons from "iconoir-react";
import { CartItem } from "../api/types";

export const Checkout = (_: RoutableProps) => {
  const { data, totalPrice } = useUserCart();

  const shippingOptions = ["DPD", "DHL"];
  const paymentOptions = ["Przelewy24", "PayPal", "BLIK"];
  const shippingCost = 10;

  const applyDiscountCode = () => {};

  return (
    <Layout>
      <div style={styles.container}>
        <h2>Cart Summary</h2>
        <table style={styles.table}>
          <thead data-variant="secondary">
            <tr>
              <th style={styles.tableHeader}>Product</th>
              <th style={styles.tableHeader}>Details</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Value</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <CheckoutItem cartItem={item} />
            ))}
          </tbody>
        </table>
        <div data-display="flex" data-main="end" data-p="12">
          <button
            type="button"
            class="c-button"
            data-variant="with-icon"
            data-color="gray-600"
            title={"Add More Products"}
            data-ml="auto"
          >
            Add More Products
          </button>
        </div>

        <div style={styles.flexContainer}>
          <div style={styles.column}>
            <h4 style={styles.header}>Shipping Options</h4>
            {shippingOptions.map((option, index) => (
              <div style={styles.radioButton} key={option}>
                <input type="radio" name="shipping" id={`shipping${index}`} />
                <label
                  htmlFor={`shipping${index}`}
                  style={styles.radioButtonLabel}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div style={styles.column}>
            <h4 style={styles.header}>Payment Options</h4>
            {paymentOptions.map((option, index) => (
              <div style={styles.radioButton} key={option}>
                <input type="radio" name="payment" id={`payment${index}`} />
                <label
                  htmlFor={`payment${index}`}
                  style={styles.radioButtonLabel}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div style={styles.column}>
            <h4 style={styles.header}>Summary</h4>
            <div style={styles.summarySection}>
              <div>Shipping Cost: ${shippingCost}</div>
              <div>Total Price: ${totalPrice + shippingCost}</div>
            </div>
            <div style={styles.discountCode}>
              <input type="text" placeholder="Discount Code" />
              <button
                type="button"
                class="c-button"
                data-variant="with-icon"
                data-color="gray-600"
                title={"Apply"}
                data-ml="auto"
              >
                Apply
              </button>
            </div>
            <div style={styles.checkoutButton}>
              <button
                type="button"
                class="c-button"
                data-variant="with-icon"
                data-color="gray-600"
                title={"Proceed to checkout"}
                data-ml="auto"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface CheckoutItemProps {
  cartItem: CartItem;
}

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const { onProductQuantityIncrease, onProductQuantityDecrease, quantity } =
    useQuantity(cartItem);

  return (
    <tr key={cartItem.id} style={styles.tableRow}>
      <td style={{ ...styles.tableCell, ...styles.imageCell }}>
        <img
          src={cartItem.product.image}
          alt={cartItem.product.name}
          width="60"
          height="60"
        />
      </td>
      <td style={styles.tableCell}>{cartItem.product.description}</td>
      <td style={{ ...styles.tableCell, ...styles.quantityCell }}>
        <div
          data-cross="center"
          data-display="flex"
          data-main="between"
          data-wrap="nowrap"
        >
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
          <label>{quantity}</label>
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
      </td>
      <td style={styles.tableCell}>${cartItem.product.price}</td>
      <td style={styles.tableCell}>
        ${cartItem.product.price * cartItem.quantity}
      </td>
    </tr>
  );
};

const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  },
  tableHeader: {
    fontWeight: "bold",
    padding: "8px",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid transparent",
  },
  tableCell: {
    padding: "8px",
    verticalAlign: "middle",
    borderBottom: "1px solid #ccc",
  },
  imageCell: {
    width: "80px",
  },
  quantityCell: {
    width: "100px",
  },
  shippingOptions: {
    marginTop: "20px",
  },
  summary: {
    marginTop: "20px",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#ccc",
    color: "#fff",
    borderRadius: "4px",
    textDecoration: "none",
    marginRight: "10px",
  },
  discountCode: {
    marginTop: "10px",
  },
  paymentOptions: {
    marginTop: "20px",
  },
  paymentSummary: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutButton: {
    marginTop: "10px",
  },
  tableHeaderCell: {
    width: "33.33%",
    paddingBottom: "10px",
    marginRight: "10px",
    borderBottom: "1px solid gray",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  column: {
    flexBasis: "calc(33.33% - 20px)",
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  header: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  radioButton: {
    display: "flex",
    alignItems: "center",
  },
  radioButtonLabel: {
    marginLeft: "5px",
  },
  summarySection: {
    marginTop: "20px",
  },
};
