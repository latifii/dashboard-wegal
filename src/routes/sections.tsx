import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import Verify from 'src/pages/verify';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const RolesPage = lazy(() => import('src/pages/roles'));
export const LogsPage = lazy(() => import('src/pages/logs'));
export const InInventoryPage = lazy(() => import('src/pages/in-Inventory'));
export const OutInventoryPage = lazy(() => import('src/pages/out-Inventory'));
export const InvoicePage = lazy(() => import('src/pages/invoice'));
export const WarrantyRegisterPage = lazy(() => import('src/pages/warranty-register'));
export const WarrantyDisplayPage = lazy(() => import('src/pages/warranty-display'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'users', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'roles', element: <RolesPage /> },
        { path: 'logs', element: <LogsPage /> },
        { path: 'in-inventory', element: <InInventoryPage /> },
        { path: 'out-inventory', element: <OutInventoryPage /> },
        { path: 'invoice', element: <InvoicePage /> },
        { path: 'warranty-register', element: <WarrantyRegisterPage /> },
        { path: 'warranty-display', element: <WarrantyDisplayPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },

    {
      path: 'verify',
      element: (
        <AuthLayout>
          <Verify />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
