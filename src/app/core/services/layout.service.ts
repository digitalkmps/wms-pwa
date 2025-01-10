import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<{ handset: boolean }> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(({ matches }) => (matches ? { handset: true } : { handset: false }))
    );
}
