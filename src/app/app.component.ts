import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { F1ApiService } from './f1-api.service';
import { Driver } from './models/driver';
import { PagingResult } from './models/page';
import { QualifyingResult, Race } from './models/race';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rxf1';
  seasons = ['2018', '2019', '2020', '2021', '2022'];
  pageSizeOptions = [10, 15, 25];
  showRaces = true;
  selectedSeasonSubject = new BehaviorSubject('2018');
  selectedSeason$ = this.selectedSeasonSubject.asObservable();

  selectedRaceSubject: BehaviorSubject<string> = new BehaviorSubject('');
  selectedRace$ = this.selectedRaceSubject.asObservable();

  racesPerSeasonResults$: Observable<PagingResult<Race>>;
  racesPerSeason$: Observable<Race[]>;
  totalRacesPerSeason$: Observable<number>;
  racesPageNumberSubject = new BehaviorSubject(0);
  racesPageNumber$ = this.racesPageNumberSubject.asObservable();
  racesItemsPerPageSubject = new BehaviorSubject(10);
  racesItemsPerPage$ = this.racesItemsPerPageSubject.asObservable();

  qualifyingResults$: Observable<QualifyingResult[]>;

  driversPerSeasonResults$: Observable<PagingResult<Driver>>;
  driversPerSeason$: Observable<Driver[]>;
  totalDriversPerSeason$: Observable<number>;
  driversPageNumberSubject = new BehaviorSubject(0);
  driversPageNumber$ = this.driversPageNumberSubject.asObservable();
  driversItemsPerPageSubject = new BehaviorSubject(10);
  driversItemsPerPage$ = this.driversItemsPerPageSubject.asObservable();
  driversOffset$: Observable<number>;

  constructor(api: F1ApiService) {
    this.racesPerSeasonResults$ = combineLatest([
      this.selectedSeason$,
      this.racesPageNumber$,
      this.racesItemsPerPage$,
    ]).pipe(
      switchMap(([season, pageNumber, itemsPerPage]) => {
        return api.GetRacesForSeason(
          season,
          pageNumber * itemsPerPage,
          itemsPerPage
        );
      })
    );

    this.racesPerSeason$ = this.racesPerSeasonResults$.pipe(
      map((value) => {
        return value.data;
      })
    );
    this.totalRacesPerSeason$ = this.racesPerSeasonResults$.pipe(
      map((value) => {
        return value.totalElements;
      })
    );

    this.driversPerSeasonResults$ = combineLatest([
      this.selectedSeason$,
      this.driversPageNumber$,
      this.driversItemsPerPage$,
    ]).pipe(
      switchMap(([season, pageNumber, itemsPerPage]) => {
        return api.GetDriversForSeason(
          season,
          pageNumber * itemsPerPage,
          itemsPerPage
        );
      })
    );

    this.driversPerSeason$ = this.driversPerSeasonResults$.pipe(
      map((value) => {
        return value.data;
      })
    );
    this.totalDriversPerSeason$ = this.driversPerSeasonResults$.pipe(
      map((value) => {
        return value.totalElements;
      })
    );

    this.driversOffset$ = combineLatest([
      this.driversItemsPerPage$,
      this.driversPageNumber$,
    ]).pipe(
      map(([a, b]) => {
        return a * b;
      })
    );

    this.qualifyingResults$ = combineLatest([
      this.selectedSeason$,
      this.selectedRace$,
    ]).pipe(
      switchMap(([season, round]) => {
        let races: Observable<QualifyingResult[]> = of([]);
        if (round != '') {
          races = api.GetQualifyingForRace(season, round);
        }
        return races;
      })
    );
  }

  seasonChanged(season: string) {
    this.selectedSeasonSubject.next(season);
    this.racesPageNumberSubject.next(0);
    this.driversPageNumberSubject.next(0);
    this.selectedRaceSubject.next('');
  }
  raceItemsPerPageChanged(pageEvent: PageEvent) {
    this.racesItemsPerPageSubject.next(pageEvent.pageSize);
    this.racesPageNumberSubject.next(pageEvent.pageIndex);
  }
  driverItemsPerPageChanged(pageEvent: PageEvent) {
    this.driversItemsPerPageSubject.next(pageEvent.pageSize);
    this.driversPageNumberSubject.next(pageEvent.pageIndex);
  }
  setSelectedRace(round: string) {
    this.selectedRaceSubject.next(round);
  }
}
