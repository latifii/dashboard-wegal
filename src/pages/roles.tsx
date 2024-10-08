import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RolesView } from 'src/sections/roles/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`نقش ها-${CONFIG.appName}`}</title>
      </Helmet>

      <RolesView />
    </>
  );
}
