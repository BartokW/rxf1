import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { F1ApiService } from './f1-api.service';
import { PagingResult } from './models/page';
import { Race } from './models/race';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let f1ApiServiceSpy: jasmine.SpyObj<F1ApiService>;
  beforeEach(async () => {
    f1ApiServiceSpy = jasmine.createSpyObj('F1ApiService', [
      'GetDriversForSeason',
      'GetRacesForSeason',
      'GetDriverStandingsAfterRace',
      'GetQualifyingForRace',
      'GetRaceResults',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatPaginatorModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: F1ApiService, useValue: f1ApiServiceSpy }],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rxf1'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rxf1');
  });

  it('should render Races', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Races');
  });

  it('should render a race name', () => {
    const sampleData: PagingResult<Race> = {
      totalElements: 20,
      data: [
        {
          round: '99',
          season: '2018',
          url: '',
          raceName: 'Warrington Grand Prix',
          Circuit: {
            circuitId: '',
            circuitName: '',
            url: '',
            Location: { lat: '', long: '', locality: '', country: '' },
          },
          date: '',
          time: '',
        },
      ],
    };
    f1ApiServiceSpy.GetRacesForSeason.and.returnValue(of(sampleData));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td')?.textContent).toContain('99');
  });
});
