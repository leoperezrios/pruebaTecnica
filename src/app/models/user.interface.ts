export type Roles = "SUSCRIBE | ADMIN";

export interface User {
  correo: string;
  password: number;
}
export interface UserResponse{
  usuario: string;
  token: string;
  role: string;
}
