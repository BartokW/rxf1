export interface PagingResult<T> {
  totalElements: number;
  data: T[];
}

export interface F1Data {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
}

export interface F1Root<T> {
  MRData: T;
}

export type DetailType = '' | 'qualifying' | 'standings' | 'results';
