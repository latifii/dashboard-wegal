import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { VerifyView } from 'src/sections/verify';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`تایید کد-${CONFIG.appName}`}</title>
      </Helmet>

      <VerifyView />
    </>
  );
}
