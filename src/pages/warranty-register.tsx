import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { WarrantyRegisterView } from 'src/sections/warranty-register/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`گارانتی - ${CONFIG.appName}`}</title>
      </Helmet>

      <WarrantyRegisterView />
    </>
  );
}
