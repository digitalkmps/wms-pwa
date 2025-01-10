import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  Input,
  numberAttribute,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { StationCardComponent } from '../../shared/components/station-card/station-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { LayoutFacade } from '../../core/facades/layout.facade';

@Component({
  selector: 'app-single-station',
  imports: [StationCardComponent, MatGridListModule],
  templateUrl: './single-station.component.html',
  styleUrl: './single-station.component.scss',
})
export class SingleStationComponent {
  stationId = signal(0);
  @Input()
  set id(station: number) {
    this.stationId.set(+station);
  }

  private layoutFacade = inject(LayoutFacade);
  layout = toSignal(this.layoutFacade.getLayoutData());

  protected columns = computed(() => {
    return this.layout()?.handset ? 1 : 2;
  });
}
