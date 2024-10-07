import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OutInventoryView } from 'src/sections/out-Inventory';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Logs - ${CONFIG.appName}`}</title>
      </Helmet>

      <OutInventoryView />
    </>
  );
}
