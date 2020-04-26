import { IonicConfig } from '@ionic/core';

import '@ionic/core/css/ionic.bundle.css';

import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';

/**
 * Ionic初始化
 *
 * @export
 * @param {IonicConfig} [config]
 */
export function ionicInitialize(config?: IonicConfig) {
  const win: any = window as any;
  const Ionic = (win.Ionic = win.Ionic || {});

  Ionic.config = config;
  applyPolyfills().then(() => defineCustomElements(win));
}
