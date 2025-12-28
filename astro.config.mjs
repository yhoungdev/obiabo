// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";


import sanity from "@sanity/astro";


// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), mdx(), sanity({
    projectId: '6jsm7r00',
    dataset: 'production',
    // Optionally, you can specify other Sanity options here
    useCdn: false,
  })],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});