export interface LoginRequest {
  email: string;
  password: string;

}
export interface LoginResponse {
  status: number;
  message: string;
  token: string;
}
