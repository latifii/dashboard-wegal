import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { LogsView } from 'src/sections/logs/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Logs - ${CONFIG.appName}`}</title>
      </Helmet>

      <LogsView />
    </>
  );
}
