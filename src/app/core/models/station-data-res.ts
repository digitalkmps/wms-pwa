import { StationData } from './station-data';
import { StationInfo } from './station-info';

export interface StationDataResponse {
  info: StationInfo;
  stationId: number;
  stationData: StationData[];
}
