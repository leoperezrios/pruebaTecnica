export type Roles = 'SUSCRIPTOR' | 'ADMIN' | '';

export interface User {
  correo: string;
  password: string;
}
export interface UserResponse {
  usuario: any;
  token: string;
}
