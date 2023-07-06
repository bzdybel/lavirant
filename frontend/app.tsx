import { h } from "preact";
import Router from "preact-router";
import { Dashboard } from "./dashboard";
import type { Schema, TranslationsType } from "@bgord/node";
import * as bg from "@bgord/frontend";
import { Contact } from "./contact/contact";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigation } from "./navigation/navigation";
import { Checkout } from "./checkout/Checkout";

export type InitialDataType = {
  url: string;
  translations: TranslationsType;
  language: Schema.LanguageType;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false } },
});

export function App(props: InitialDataType) {
  return (
    <QueryClientProvider client={queryClient}>
      <bg.TranslationsContextProvider
        value={{ translations: props.translations, language: props.language }}
      >
        <bg.ToastsContextProvider>
          <Navigation />

          <Router url={props.url}>
            <Dashboard path="/dashboard" />
            <Checkout path="/checkout" />
            <Contact path="/contact" />
          </Router>
        </bg.ToastsContextProvider>
      </bg.TranslationsContextProvider>
    </QueryClientProvider>
  );
}
