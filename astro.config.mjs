// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import db from "@astrojs/db";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering by default
  integrations: [tailwind(), react(), mdx(), db()],

  adapter: node({
    mode: "standalone",
  }),
});