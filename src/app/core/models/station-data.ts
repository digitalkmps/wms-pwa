export interface StationData {
  eventTime: number;
  temperature: number;
  humidity: number;
  distance: number;
  light: boolean;
}

export interface StationDataExt extends StationData {
  stationId: number;
}
