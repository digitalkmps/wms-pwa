import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subject,
  concatMap,
  filter,
  from,
  interval,
  map,
  startWith,
} from 'rxjs';
import { StationData, StationDataExt } from '../models/station-data';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { StationInfoService } from './station-info.service';

const WMS_IP = 'wms-demo.digitalkmps.eu';
const WMS_PORT = '8991';
const WMS_URL = `http://${WMS_IP}:${WMS_PORT}`;

@Injectable({
  providedIn: 'root',
})
export class StationDataService {
  private readonly http = inject(HttpClient);
  private readonly stationInfo = inject(StationInfoService);
  private platformId: Object = inject(PLATFORM_ID);
  private stationDataSubject = new Subject<StationDataExt>();
  isBrowser: boolean = isPlatformBrowser(this.platformId);
  isServer: boolean = isPlatformServer(this.platformId);
  stationList: number[] = this.stationInfo.getStationList();

  stationData$: Observable<StationDataExt> =
    this.stationDataSubject.asObservable();

  constructor() {
    this.updateLastStationData();
    console.log('started');
  }

  getLastStationData(id: number): Observable<StationData> {
    return this.http.get<StationData>(`${WMS_URL}/station-data/last/${id}`);
  }

  updateLastStationData() {
    if (this.isBrowser) {
      interval(10000)
        .pipe(
          startWith(0),
          concatMap(() =>
            from(this.stationList).pipe(
              concatMap((stationId) =>
                this.getLastStationData(stationId).pipe(
                  filter((data) => !!data),
                  map((data) => ({ ...data, stationId }))
                )
              )
            )
          )
        )
        .subscribe((data: StationDataExt) => {
          this.stationDataSubject.next(data);
        });
    }
  }
}
