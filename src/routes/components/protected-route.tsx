import { Navigate } from 'react-router-dom';

import { getAccessToken } from 'src/utils/local-storage';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isGetAccessToken = Boolean(getAccessToken());

  if (!isGetAccessToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
