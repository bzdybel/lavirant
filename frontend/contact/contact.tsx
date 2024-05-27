import { h, FunctionComponent } from "preact";
import { RoutableProps } from "preact-router";
import * as bg from "@bgord/frontend";
import { useContact } from "./useContact";
import { Layout } from "../uti";

interface FormData {
  email: string;
  name: string;
  message: string;
}

export const Contact: FunctionComponent<RoutableProps> = (_: RoutableProps) => {
  const t = bg.useTranslations();
  const notify = bg.useToastTrigger();

  const sendEmail = useContact();

  const handleSubmit = (event: h.JSX.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault();
    notify({ message: "!@#" });
    const formData = new FormData(event.currentTarget);
    const serializedFormData: FormData = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      message: formData.get("message") as string,
    };

    sendEmail.mutate({
      email: serializedFormData.email,
      name: serializedFormData.name,
      subject: t("contact"),
      message: serializedFormData.message,
    });
  };

  return (
    <Layout>
      <form
        data-display="flex"
        data-direction="column"
        data-gap="12"
        data-bg="gray-100"
        data-p="48"
        data-br="4"
        data-shadow
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-display="flex"
          data-px="12"
          data-py="12"
          data-gap="12"
          data-cross="center"
          className="c-input"
          placeholder={t("name")}
          name="name"
        />

        <input
          type="email"
          data-display="flex"
          data-gap="12"
          data-cross="center"
          className="c-input"
          placeholder={t("email")}
          name="email"
        />

        <textarea
          data-display="flex"
          data-gap="12"
          data-height="100%"
          data-cross="center"
          className="c-input"
          placeholder={t("message")}
          style={{ minHeight: 250 }}
          name="message"
        />

        <button
          type="submit"
          data-display="flex"
          data-color="black"
          data-transform="uppercase"
          data-fw="700"
          class="c-button"
          data-variant="bare"
        >
          {t("submit")}
        </button>
      </form>
    </Layout>
  );
};
