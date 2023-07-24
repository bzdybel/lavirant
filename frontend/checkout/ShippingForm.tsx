import { h } from "preact";
import * as bg from "@bgord/frontend";
import { TabsProps } from "../ui";
import { Layout } from "../uti";

interface ShippingFormProps {
  handleTabClick: TabsProps["handleTabClick"];
}

export const ShippingForm = ({ handleTabClick }: ShippingFormProps) => {
  const t = bg.useTranslations();

  return (
    <Layout>
      <div style={styles.container}>
        <form
          data-display="flex"
          data-direction="column"
          data-gap="12"
          data-mt="12"
          data-md-mt="24"
          onSubmit={(event) => {
            event.preventDefault();
            // addArticleRequest.mutate({ url: url.value });
          }}
        >
          <div data-display="flex" data-gap="12">
            <div data-display="flex" data-direction="column" data-grow="1">
              <label class="c-label" htmlFor="name">
                {t("name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={t("name")}
                class="c-input"
                data-grow="1"
              />
            </div>

            <div data-display="flex" data-direction="column" data-grow="1">
              <label class="c-label" htmlFor="surname">
                {t("surname")}
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                required
                placeholder={t("surname")}
                class="c-input"
                data-grow="1"
              />
            </div>
          </div>

          <div data-display="flex" data-gap="12">
            <div data-display="flex" data-direction="column" data-grow="1">
              <label class="c-label" htmlFor="zip">
                {t("zipCode")}
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                inputMode="numeric"
                class="c-input"
                pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                placeholder={t("zipCode")}
              />
            </div>
            <div data-display="flex" data-direction="column" data-grow="1">
              <label class="c-label" htmlFor="city">
                {t("city")}
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder={t("city")}
                class="c-input"
              />
            </div>
            <div data-display="flex" data-direction="column" data-grow="1">
              <label class="c-label" htmlFor="address">
                {t("address")}
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder={t("address")}
                class="c-input"
              />
            </div>
          </div>
          <div data-display="flex" data-gap="12">
            <div data-display="flex" data-direction="column" data-grow="1">
              <label class="c-label" htmlFor="phone-number">
                {t("phoneNumber")}
              </label>

              <input
                id="phone-number"
                name="phone-number"
                type="text"
                required
                placeholder={t("phoneNumber")}
                class="c-input"
              />
            </div>
            <div data-display="flex" data-direction="column" data-grow="1">
              <label class="c-label" htmlFor="email">
                {t("email")}
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t("email")}
                class="c-input"
              />
            </div>
          </div>
          <button
            type="button"
            class="c-button"
            data-variant="with-icon"
            data-color="gray-600"
            title={"Podsumowanie"}
            data-ml="auto"
            onClick={() => handleTabClick(3)}
          >
            Podsumowanie
          </button>
        </form>
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
