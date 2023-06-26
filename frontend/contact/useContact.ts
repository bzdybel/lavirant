import { useMutation } from "react-query";
import { sendEmail } from "../api/api";
import { ServerError } from "../api/server-error";
import * as bg from "@bgord/frontend";

export const useContact = () => {
  const notify = bg.useToastTrigger();

  return useMutation(sendEmail, {
    onSuccess: () => {
      notify({ message: "email-sent" });
    },

    onError: (error: ServerError) => {
      notify({ message: error.message });
    },
  });
};
