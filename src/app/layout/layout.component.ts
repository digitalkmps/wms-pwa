import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutFacade } from '../core/facades/layout.facade';
import { StationInfoView } from '../core/models/station-info';
import { StationInfoService } from '../core/services/station-info.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class LayoutComponent {
  private layoutFacade = inject(LayoutFacade);

  layout = toSignal(this.layoutFacade.getLayoutData());

  private readonly stationService: StationInfoService =
    inject(StationInfoService);
  stationInfoList: StationInfoView[] = this.stationService.getStationInfoList();
}
