import { PaginatorInput } from './';
import { Admin as AdminEntity } from './../entity/Admin';
import { Status } from './../entity/root/enums';

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password?: string;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  errors?: string[];
  data?: { admin: AdminEntity };
  errorMessage?: string | '';
}

export interface Params {
  searchText: string;
  status: string;
}

export interface AdminFilters {
  params: Params;
  paging: PaginatorInput;
}

export interface SaveAdminPayload {
  errors?: string[];
  data?: { admin: AdminEntity };
  errorMessage?: string | '';
}
