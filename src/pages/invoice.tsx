import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { InvoiceView } from 'src/sections/invoice';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`فاکتور ها-${CONFIG.appName}`}</title>
      </Helmet>

      <InvoiceView />
    </>
  );
}
