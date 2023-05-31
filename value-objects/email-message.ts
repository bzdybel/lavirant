import { z } from "zod";

export const EmailMessage = z.string().min(1).max(1000);
export type EmailMessageType = z.infer<typeof EmailMessage>;
