// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import critters from "@critters-rs/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://wigzen.dev",
  integrations: [
    mdx(),
    sitemap(),
    critters(),
  ],
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ["gsap", "gsap/ScrollTrigger"],
          },
        },
      },
    },
  },
});
