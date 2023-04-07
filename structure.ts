import Iframe from "sanity-plugin-iframe-pane";
import type { DefaultDocumentNodeResolver } from "sanity/desk";

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // If the schema type is post
  if (schemaType === "post") {
    // Return a document view with an iframe
    return S.document().views([
      S.view.form(),

      S.view
        .component(Iframe)
        .options({
          url: `${
            process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
          }/api/preview`,
          defaultSize: "desktop",
          reload: {
            button: true,
          },
          attributes: {},
        })
        .title("Preview"),
    ]);
  }
};
