import { Component, computed, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutFacade } from '../../core/facades/layout.facade';
import { StationCardComponent } from '../../shared/components/station-card/station-card.component';
import { StationDataFacade } from '../../core/facades/station-data.facade';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    MatGridListModule,
    StationCardComponent,
  ],
})
export class DashboardComponent {
  private layoutFacade = inject(LayoutFacade);
  layout = toSignal(this.layoutFacade.getLayoutData());
  private stationDataFacade = inject(StationDataFacade);
  stationInfoList: number[] = this.stationDataFacade.getStationList();

  /** Based on the screen size, switch from standard to one column per row */
  protected cards = computed(() => {
    return this.layout()?.handset
      ? this.stationInfoList.map((stationId) => ({
          stationId,
          cols: 3,
          rows: 1,
        }))
      : this.stationInfoList.map((stationId) => ({
          stationId,
          cols: 1,
          rows: 1,
        }));
  });
}
