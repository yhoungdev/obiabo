// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), mdx()],

  adapter: node({
    mode: "standalone",
  }),
});