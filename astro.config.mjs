import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://appliedpoetics.org',
  devToolbar: {
    enabled: false
  },
  integrations: [react()],
});
