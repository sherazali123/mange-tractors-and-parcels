import { Geolocation, PaginatorInput } from './';
import { TractorParcel as TractorParcelEntity } from './../entity/TractorParcel';

export interface TractorParcel {
  id: string;
  tractorId: string;
  parcelId: string;
  processOn: Date;
  area: string;
  geoLocation: Geolocation;
  longitude?: number;
  latitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Params {
  parcelName: string;
  culture: string;
  date: string;
  tractorName: string;
}

export interface TractorParcelFilters {
  params: Params;
  paging: PaginatorInput;
}

export interface SaveTractorParcelPayload {
  errors?: string[];
  data?: { tractorParcel: TractorParcelEntity };
  errorMessage?: string | '';
}
