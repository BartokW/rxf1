import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { Driver, DriverData } from './models/driver';
import { Race, RaceData } from './models/race';
import { F1Root, PagingResult } from './models/page';
import { StandingsData, StandingsList } from './models/standings';

@Injectable({
  providedIn: 'root',
})
export class F1ApiService {
  constructor(private http: HttpClient) {}

  public GetDriversForSeason(
    year: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PagingResult<Driver>> {
    return this.http
      .get<F1Root<DriverData>>(
        `http://ergast.com/api/f1/${year}/drivers.json?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((root) => {
          return {
            data: root.MRData.DriverTable.Drivers,
            totalElements: parseInt(root.MRData.total),
          } as PagingResult<Driver>;
        }),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  public GetRacesForSeason(
    year: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PagingResult<Race>> {
    return this.http
      .get<F1Root<RaceData>>(
        `http://ergast.com/api/f1/${year}.json?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((root) => {
          return {
            data: root.MRData.RaceTable.Races,
            totalElements: parseInt(root.MRData.total),
          } as PagingResult<Race>;
        }),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  public GetDriverStandingsAfterRace(
    year: string,
    round: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PagingResult<StandingsList>> {
    return this.http
      .get<F1Root<StandingsData>>(
        `http://ergast.com/api/f1/${year}/${round}/driverStandings.json?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((root) => {
          return {
            data: root.MRData.StandingsTable.StandingsLists,
            totalElements: parseInt(root.MRData.total),
          } as PagingResult<StandingsList>;
        }),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  public GetQualifyingForRace(
    year: string,
    round: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PagingResult<Race>> {
    //http://ergast.com/api/f1/{{year}}/{{round}}/qualifying.json
    return this.http
      .get<F1Root<RaceData>>(
        `http://ergast.com/api/f1/${year}/${round}/qualifying.json?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((root) => {
          return {
            data: root.MRData.RaceTable.Races,
            totalElements: parseInt(root.MRData.total),
          } as PagingResult<Race>;
        }),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  public GetRaceResults(
    year: string,
    round: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PagingResult<Race>> {
    //http://ergast.com/api/f1/2018/2/results.json
    return this.http
      .get<F1Root<RaceData>>(
        `http://ergast.com/api/f1/${year}/${round}/results.json?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((root) => {
          return {
            data: root.MRData.RaceTable.Races,
            totalElements: parseInt(root.MRData.total),
          } as PagingResult<Race>;
        }),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
