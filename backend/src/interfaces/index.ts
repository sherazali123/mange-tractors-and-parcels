export interface PaginatorInput {
  page: number;
  limit: number;
  totalPages?: number;
}

export interface PaginatorOutput {
  page: number;
  limit: number;
  totalPages: number;
}

export interface Validator {
  errors: string[];
  data?: any;
  errorMessage?: string | '';
}

export interface Geolocation {
  type: string;
  coordinates: number[];
}

export interface Sort {
  field: string;
  order: string;
  alias?: string | '';
}
