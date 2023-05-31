import express from "express";
import { Mailer } from "../services/mailer";
import { EmailMessage } from "../value-objects/email-message";
import { Env } from "../env";

export async function SendMessage(
  request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  try {
    const message = EmailMessage.parse(request.body.message);

    await Mailer.send({
      from: Env.EMAIL_FROM,
      to: request.body.email,
      subject: request.body.subject,
      text: message,
    });
    response.sendStatus(200);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
}
