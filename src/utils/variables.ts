import type { UserType } from 'src/types/user.interface';

export const variableRoles: Record<UserType, string> = {
  VegalAdmin: 'ادمین',
  Vendor: 'نمایندگی',
  // null: 'کاربر عادی',
};

export const typeIdRoles = {
  VegalAdmin: '4FF8672A-6B5D-4506-86DA-651AA5DBB011',
  Vendor: '801c5433fe5247399771ed8a2967985b',
};
