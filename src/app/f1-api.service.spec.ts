import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { F1ApiService } from './f1-api.service';
import { Driver } from './models/driver';
import { Race } from './models/race';

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
  it('should get drivers for a season', () => {
    httpClientSpy.get.and.returnValue(of([] as Driver[]));
    let drivers = service.GetDriversForSeason('2018');
    expect(drivers).toBeTruthy();
  });

  it('should get races for a season', () => {
    httpClientSpy.get.and.returnValue(of([] as Race[]));
    let races = service.GetRacesForSeason('2018');
    expect(races).toBeTruthy();
  });
});
