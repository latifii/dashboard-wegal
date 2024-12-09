import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ProfileView from 'src/sections/profile/profile-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`ویرایش پروفایل - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProfileView />
    </>
  );
}
