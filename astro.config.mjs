import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sovereigncall.com",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/404") && !page.endsWith("/thanks") && !page.endsWith("/links"),
    }),
  ],
});
