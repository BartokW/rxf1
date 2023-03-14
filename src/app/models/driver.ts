import { F1Data } from './page';

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface DriverTable {
  season: string;
  Drivers: Driver[];
}

export interface DriverData extends F1Data {
  DriverTable: DriverTable;
}
