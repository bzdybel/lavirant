import * as bg from "@bgord/node";
import serialize from "serialize-javascript";

type HtmlConfigType = {
  frontend: string;
  state: Record<string, unknown>;
  language: bg.Schema.LanguageType;
};

export class Html {
  static process(config: HtmlConfigType): string {
    const serializedState = Html.serializeState(config.state);

    return /* HTML */ `
      <!DOCTYPE html>
      <html lang="${config.language}">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />

          <meta name="description" content="Lavirant dashboard" />

          <link as="style" rel="stylesheet preload" href="/normalize.min.css" />
          <link as="style" rel="stylesheet preload" href="/main.min.css" />

          <link
            as="image"
            rel="preload"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />

          <style>
            :root {
              --reach-skip-nav: 1;
            }

            [data-reach-skip-nav-link] {
              border: 0;
              clip: rect(0 0 0 0);
              height: 1px;
              width: 1px;
              margin: -1px;
              padding: 0;
              overflow: hidden;
              position: absolute;
            }

            [data-reach-skip-nav-link]:focus {
              padding: 12px;
              position: fixed;
              top: 12px;
              left: 12px;
              background: #f3f4f6;
              color: #1f2937;
              z-index: 1;
              width: auto;
              height: auto;
              clip: auto;
            }

            [data-shadow] {
              box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 15px;
            }

            .c-link--active {
              text-decoration: underline !important;
            }
          </style>

          <title>Lavirant</title>
        </head>

        <body data-mx="auto" data-bg="gray-200">
          <div id="root">${config.frontend}</div>

          <script>
            window.__STATE__ = ${serializedState};
          </script>

          <script async src="/index.js"></script>
        </body>
      </html>
    `;
  }

  private static serializeState(state: HtmlConfigType["state"]): string {
    return serialize(state, { isJSON: true });
  }
}
