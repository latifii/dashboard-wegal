import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'داشبورد',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'لیست کاربران',
    path: '/users',
    icon: icon('ic-user'),
  },
  {
    title: 'لیست نقش ها',
    path: '/roles',
    icon: icon('ic-cart'),
  },
  {
    title: 'فعالیت ها',
    path: '/logs',
    icon: icon('ic-cart'),
  },

  {
    title: 'ورود انبار',
    path: '/in-inventory',
    icon: icon('ic-cart'),
  },
  {
    title: 'خروج انبار',
    path: '/out-inventory',
    icon: icon('ic-cart'),
  },

  {
    title: 'فاکتور',
    path: '/invoice',
    icon: icon('ic-cart'),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
