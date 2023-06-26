import express from "express";
import render from "preact-render-to-string";

import * as Services from "../services";

import { App } from "../frontend/app";
import * as bg from "@bgord/node";

export async function Dashboard(
  request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  const translations = await bg.Language.getTranslations(
    request.language,
    request.translationsPath
  );
  const state = {
    language: request.language,
    translations,
  };
  const frontend = render(App({ ...state, url: request.url }));
  const html = Services.Html.process({
    frontend,
    state,
    language: request.language,
  });

  return response.send(html);
}
