import { Driver } from './driver';
import { F1Data } from './page';
import { Constructor } from './race';

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface StandingsList {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
}

export interface StandingsTable {
  season: string;
  round: string;
  StandingsLists: StandingsList[];
}

export interface StandingsData extends F1Data {
  StandingsTable: StandingsTable;
}
