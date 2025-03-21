export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export interface ApiError {
  error: string;
  message: string;
  details?: ErrorDetail[];
}