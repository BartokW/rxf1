import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { F1ApiService } from './f1-api.service';
import { Driver } from './models/driver';
import { PagingResult } from './models/page';
import { Race } from './models/race';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rxf1';
  seasons = ['2018', '2019', '2020', '2021', '2022'];
  selectedSeasonSubject = new BehaviorSubject('2018');
  selectedSeason$ = this.selectedSeasonSubject.asObservable();

  racesPerSeason$: Observable<PagingResult<Race>>;
  driversPerSeason$: Observable<PagingResult<Driver>>;

  constructor(api: F1ApiService) {
    this.racesPerSeason$ = combineLatest([this.selectedSeason$]).pipe(
      switchMap(([season]) => {
        return api.GetRacesForSeason(season);
      })
    );
    this.driversPerSeason$ = combineLatest([this.selectedSeason$]).pipe(
      switchMap(([season]) => {
        return api.GetDriversForSeason(season);
      })
    );
  }

  seasonChanged(season: string) {
    this.selectedSeasonSubject.next(season);
  }
}
