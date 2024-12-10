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

export interface UserInfo {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  userType?: string;
  role: RoleUser[];
}
