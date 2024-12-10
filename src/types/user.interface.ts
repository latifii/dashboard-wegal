export interface User {
  id: string;
  number: string;
}

export interface UpdateProfile {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RoleUser {
  uniqueName: string;
  code: number;
}

export type UserType = 'VegalAdmin' | 'Vendor';

export interface UserInfo {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  userType?: UserType;
  role: RoleUser[];
}
