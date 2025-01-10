import { Injectable } from '@angular/core';
import {  StationInfoView } from '../models/station-info';

@Injectable({
  providedIn: 'root',
})
export class StationInfoService {
  private readonly stationList: number[] = [22, 23, 24, 25, 26];
  private readonly stationInfo: StationInfoView[] = [
    {
      stationId: 22,
      latitude: 42.14492,
      longitude: 24.75032,
      description: 'Station for water level monitoring Anton Ivanov',
      location: 'Anton Ivanov',
    },
    {
      stationId: 23,
      latitude: 42.14492,
      longitude: 24.75032,
      description: 'Station for water level monitoring Marica 33km',
      location: 'Marica 33km',
    },
    {
      stationId: 24,
      latitude: 42.14492,
      longitude: 24.75032,
      description: 'Station for water level monitoring Dospat',
      location: 'Dospat',
    },
    {
      stationId: 25,
      latitude: 42.14492,
      longitude: 24.75032,
      description: 'Station for water level monitoring Batak',
      location: 'Batak',
    },
    {
      stationId: 26,
      latitude: 42.14492,
      longitude: 24.75032,
      description: 'Station for water level monitoring Kamchia',
      location: 'Kamchia',
    },
  ];

  /**
   * Retrieves the list of station IDs.
   * @returns An array of station IDs.
   */
  getStationList(): number[] {
    return this.stationList;
  }
  getStationInfoList(): StationInfoView[] {
    return this.stationInfo;
  }

  getStationInfo(stationId: number): StationInfoView {
    return this.stationInfo.find(e => e.stationId === stationId)!;
  }
}
