import { StationDataExt } from './station-data';

export interface StationInfo {
  latitude: number;
  longitude: number;
  description: string;
  location: string;
}
export interface StationInfoView extends StationInfo {
  stationId: number;
}

export interface ExtraStationData extends StationDataExt, StationInfo {}
