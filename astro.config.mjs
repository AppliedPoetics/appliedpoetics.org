import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  devToolbar: {
    enabled: false
  },

  integrations: [react()],
  adapter: cloudflare()
});