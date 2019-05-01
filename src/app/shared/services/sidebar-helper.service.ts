import { Injectable } from '@angular/core';
import { SidebarDirective } from '../directives/sidebar.directive';

@Injectable({
  providedIn: 'root'
})
export class SidebarHelperService {

  sidenavInstances: SidebarDirective[];

  constructor() {
    this.sidenavInstances = [];
  }

  setSidenav(id, instance): void {
    this.sidenavInstances[id] = instance;
  }

  getSidenav(id): SidebarDirective {
    return this.sidenavInstances[id];
  }
}
