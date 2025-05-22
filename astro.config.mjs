// @ts-check
import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://wigzen.dev",
  integrations: [
    solidJs({
      include: ["**/src/components/solid/*"],
    }),
    react({
      include: ["**/src/components/react/*"],
      exclude: ["**/src/components/solid/*"],
    }),
  ],
});
