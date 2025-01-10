import { inject, Injectable } from '@angular/core';
import { StationDataService } from '../services/station-data.service';
import { filter, map, Observable } from 'rxjs';
import { StationDataExt } from '../models/station-data';
import { StationInfoService } from '../services/station-info.service';
import { ExtraStationData, StationInfoView } from '../models/station-info';

@Injectable({
  providedIn: 'root',
})
export class StationDataFacade {
  private stationDataService: StationDataService = inject(StationDataService);
  private stationInfoService: StationInfoService = inject(StationInfoService);

  getDataStationStream(stationId: number): Observable<ExtraStationData> {
    return this.stationDataService.stationData$.pipe(
      filter((data) => data.stationId === stationId),
      map((stationData: StationDataExt): ExtraStationData => {
        const { stationId, ...stationInfo } =
          this.stationInfoService.getStationInfo(stationData.stationId);
        return { ...stationData, ...stationInfo };
      })
    );
  }

  getStationInfoList(): StationInfoView[] {
    return this.stationInfoService.getStationInfoList();
  }
  getStationList(): number[] {
    return this.stationInfoService.getStationList();
  }
}
