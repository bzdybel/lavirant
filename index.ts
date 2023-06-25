import express from "express";
import * as bg from "@bgord/node";

import * as Routes from "./routes";

import { ErrorHandler } from "./error-handler";
import { Env } from "./env";
import { logger } from "./logger";

const app = express();

bg.addExpressEssentials(app);
bg.Handlebars.applyTo(app);
bg.Language.applyTo(app, bg.Schema.Path.parse("translations"));
bg.addExpressEssentials(app, {
  helmet: {
    contentSecurityPolicy: {
      directives: { "img-src": ["'self'", "images.unsplash.com"] },
    },
  },
});

new bg.Session({
  secret: Env.COOKIE_SECRET,
  store: bg.SessionFileStore.build({ ttl: bg.Time.Days(3).toSeconds() }),
}).applyTo(app);

const AuthShield = new bg.EnvUserAuthShield({
  ADMIN_USERNAME: Env.ADMIN_USERNAME,
  ADMIN_PASSWORD: Env.ADMIN_PASSWORD,
});
AuthShield.applyTo(app);
bg.HttpLogger.applyTo(app, logger);

app.get("/", bg.CsrfShield.attach, bg.Route(Routes.Home));

app.get("/products", AuthShield.verify, bg.Route(Routes.Products));

app.post(
  "/add-product-to-cart",
  AuthShield.verify,
  bg.Route(Routes.AddProductToCart)
);

app.post(
  "/remove-product-from-cart",
  AuthShield.verify,
  bg.Route(Routes.RemoveProductFromCart)
);

app.post(
  "/login",
  bg.CsrfShield.verify,
  AuthShield.attach,
  (_request, response) => response.redirect("/dashboard")
);

app.post("/contact", bg.Route(Routes.SendMessage));

app.get(
  "/dashboard",
  AuthShield.verify,
  bg.Cache.handle(bg.CacheStrategy.never),
  bg.Route(Routes.Dashboard)
);

app.get(
  "/contact",
  AuthShield.verify,
  bg.Cache.handle(bg.CacheStrategy.never),
  bg.Route(Routes.Contact)
);

app.post("/user-cart", AuthShield.verify, bg.Route(Routes.UserCart));

app.get("/logout", AuthShield.detach, (_, response) => response.redirect("/"));

app.get("*", (_, response) => response.redirect("/"));
app.use(ErrorHandler.handle);

(async function main() {
  app.listen(Env.PORT, async () => {
    logger.info({
      message: "Server has started",
      operation: "server_startup",
      metadata: { port: Env.PORT },
    });
  });
})();
