export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
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
