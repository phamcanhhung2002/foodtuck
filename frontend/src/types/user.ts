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

export interface UserRegistration {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
}

export interface UserEditRequest {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  city: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
  postIndex: string | undefined;
}

export interface UserEditErrors {
  firstNameError: string;
  lastNameError: string;
}