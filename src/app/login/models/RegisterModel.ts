export interface RegisterRequest {
  fullName: string;
  gender: number;
  doB: string;
  phoneNumber: string;
  email: string;
  address: string;
  password: string;
  roles: string[];
}

export interface RegisterResponse {
  status: number;
  message: string;
}
