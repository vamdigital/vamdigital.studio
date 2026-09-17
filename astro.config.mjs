// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import mdx from '@astrojs/mdx';

// Change these two values to use any other bundled Shiki themes.
const codeThemes = {
  light: 'github-light',
  dark: 'github-dark'
};

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: codeThemes
    }
  },
  devToolbar: {
    enabled: false
  }
});
