// eslint-disable-next-line import/no-extraneous-dependencies
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
// eslint-disable-next-line import/no-extraneous-dependencies
import rtlPlugin from 'stylis-plugin-rtl';

// ایجاد یک cache که به RTL اختصاص داده شده
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
