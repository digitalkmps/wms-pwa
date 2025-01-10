import {
  inject,
  Injectable,
} from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutFacade {
  private layoutService = inject(LayoutService);
  getLayoutData() {
    return this.layoutService.isHandset$
  }
}
