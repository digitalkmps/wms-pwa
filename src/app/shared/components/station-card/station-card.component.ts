import {
  Component,
  inject,
  Injector,
  Input,
  input,
  signal,
  Signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StationDataFacade } from '../../../core/facades/station-data.facade';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExtraStationData } from '../../../core/models/station-info';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-station-card',
  imports: [
    MatCardModule,
    DatePipe,
    DecimalPipe,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    NgClass,
    MatProgressSpinnerModule,
  ],
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.scss',
})
export class StationCardComponent {
  currentStationId = signal(0);
  stationData!: Signal<ExtraStationData>;
  injector = inject(Injector);
  mode = input.required<string>();
  stationDataFacade: StationDataFacade = inject(StationDataFacade);
  @Input()
  set stationId(station_Id: number) {
    this.currentStationId.set(station_Id);
    this.stationData = toSignal(
      this.stationDataFacade.getDataStationStream(+this.currentStationId()),
      {
        initialValue: {
          stationId: 0,
          eventTime: 0,
          temperature: 0,
          humidity: 0,
          distance: 0,
          light: false,
          latitude: 0,
          longitude: 0,
          description: '',
          location: '',
        },
        injector: this.injector,
      }
    );
  }
}
