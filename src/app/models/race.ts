import { Driver } from './driver';
import { F1Data } from './page';

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Time {
  millis: string;
  time: string;
}

export interface Time2 {
  time: string;
}

export interface AverageSpeed {
  units: string;
  speed: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time2;
  AverageSpeed: AverageSpeed;
}

export interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: Time;
  FastestLap: FastestLap;
}

export interface QualifyingResult {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Q1: string;
  Q2: string;
  Q3: string;
}
export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results?: Result[];
  QualifyingResults?: QualifyingResult[];
}

export interface RaceTable {
  season: string;
  round?: string;
  Races: Race[];
}

export interface RaceData extends F1Data {
  RaceTable: RaceTable;
}
