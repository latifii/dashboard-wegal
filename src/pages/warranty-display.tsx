import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { WarrantyDisplayView } from 'src/sections/warranty-display/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`نمایش گارانتی-${CONFIG.appName}`}</title>
      </Helmet>

      <WarrantyDisplayView />
    </>
  );
}
