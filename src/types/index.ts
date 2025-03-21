export enum UserRole {
  ADMIN = "admin",
  VENDOR = "vendor",
  CUSTOMER = "customer",
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput
  extends Omit<User, "id" | "createdAt" | "updatedAt"> {
  id?: never;
  createdAt?: never;
  updatedAt?: never;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RolePermission {
  roleId: string;
  permissionId: number;
}
