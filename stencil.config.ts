import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'ibiz-mobile-components',
  bundles: [
    { components: ['ibiz-mobile-calendar'] },
    { components: ['ibiz-drawer'] },
  ],
  plugins: [
    sass()
  ],
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
