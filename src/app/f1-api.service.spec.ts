import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { F1ApiService } from './f1-api.service';
import { Driver, DriverData, DriverTable } from './models/driver';
import { F1Root, PagingResult } from './models/page';
import { Race, RaceData } from './models/race';
import { StandingsData } from './models/standings';

describe('F1ApiService', () => {
  let service: F1ApiService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(F1ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get drivers for a season', (done) => {
    let sampleDrivers: F1Root<DriverData> = {
      MRData: {
        total: '10',
        DriverTable: { Drivers: [], season: '1' },
        xmlns: '',
        series: '',
        url: '',
        limit: '10',
        offset: '0',
      },
    };

    httpClientSpy.get.and.returnValue(of(sampleDrivers));
    service.GetDriversForSeason('2018').subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result.data).toEqual([]);
      expect(result.totalElements).toEqual(10);
      done();
    });
  });

  it('should get races for a season', (done) => {
    let sampleRaces: F1Root<RaceData> = {
      MRData: {
        total: '10',
        RaceTable: { season: '1', Races: [] },
        xmlns: '',
        series: '',
        url: '',
        limit: '10',
        offset: '0',
      },
    };
    httpClientSpy.get.and.returnValue(of(sampleRaces));
    service.GetRacesForSeason('2018').subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result.data).toEqual([]);
      expect(result.totalElements).toEqual(10);
      done();
    });
  });

  it('should get race results', (done) => {
    let sampleRaces: F1Root<RaceData> = {
      MRData: {
        total: '10',
        RaceTable: {
          season: '1',
          Races: [
            {
              Results: [],
              season: '1',
              round: '',
              url: '',
              raceName: '',
              Circuit: {
                circuitId: '',
                url: '',
                circuitName: '',
                Location: { lat: '', long: '', locality: '', country: '' },
              },
              date: '',
              time: '',
            },
          ],
        },
        xmlns: '',
        series: '',
        url: '',
        limit: '10',
        offset: '0',
      },
    };
    httpClientSpy.get.and.returnValue(of(sampleRaces));
    service.GetRaceResults('2018', '1').subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result).toEqual([]);
      done();
    });
  });

  it('should get qualifying results', (done) => {
    let sampleRaces: F1Root<RaceData> = {
      MRData: {
        total: '1',
        RaceTable: {
          season: '1',
          Races: [
            {
              QualifyingResults: [],
              season: '1',
              round: '',
              url: '',
              raceName: '',
              Circuit: {
                circuitId: '',
                url: '',
                circuitName: '',
                Location: { lat: '', long: '', locality: '', country: '' },
              },
              date: '',
              time: '',
            },
          ],
        },
        xmlns: '',
        series: '',
        url: '',
        limit: '10',
        offset: '0',
      },
    };
    httpClientSpy.get.and.returnValue(of(sampleRaces));
    service.GetQualifyingForRace('2018', '1').subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result).toEqual([]);

      done();
    });
  });

  it('should get standings after a race', (done) => {
    let sampleRaces: F1Root<StandingsData> = {
      MRData: {
        total: '10',
        StandingsTable: {
          season: '1',
          round: '1',
          StandingsLists: [{ season: '', round: '', DriverStandings: [] }],
        },
        xmlns: '',
        series: '',
        url: '',
        limit: '10',
        offset: '0',
      },
    };
    httpClientSpy.get.and.returnValue(of(sampleRaces));
    service.GetDriverStandingsAfterRace('2018', '1').subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result).toEqual([]);
      done();
    });
  });
});
