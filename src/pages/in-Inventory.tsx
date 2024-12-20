import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { InInventoryView } from 'src/sections/in-Inventory';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`ورود انبار-${CONFIG.appName}`}</title>
      </Helmet>

      <InInventoryView />
    </>
  );
}
