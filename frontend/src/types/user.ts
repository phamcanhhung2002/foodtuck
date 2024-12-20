export interface BaseUserResponse {
  id: number;
  email: string;
  firstName: string;
  roles: Array<string>;
}

export interface UserResponse extends BaseUserResponse {
  lastName: string;
  city: string;
  address: string;
  phoneNumber: string;
  postIndex: string;
  activationCode?: string
  active?: boolean;
}

export interface UserData {
  email: string;
  password: string;
}

export interface UserEditErrors {
  firstNameError: string;
  lastNameError: string;
}