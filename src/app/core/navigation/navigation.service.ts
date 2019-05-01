import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem, SidebarState } from "./navigation.model";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  sidebarState: SidebarState = {
    sideNavOpen: true,
    childNavOpen: false
  };

  defaultMenu: MenuItem[];
  menuItems$: Observable<MenuItem[]>;

  constructor() {
    this.initMenu();
    this.menuItems$ = new BehaviorSubject<MenuItem[]>(this.defaultMenu).asObservable();
  }

  private initMenu() {
    this.defaultMenu = [
      {
        name: 'Dashboard',
        type: 'link',
        icon: 'i-Statistic',
        state: '/dashboard',
      },
      {
        name: 'Stock exchanges',
        type: 'link',
        icon: 'i-Bar-Chart',
        state: '/stock'
      },
      {
        name: 'Markets',
        type: 'link',
        icon: 'i-Bitcoin',
        state: '/market'
      },
      {
        name: 'Strategies',
        type: 'dropDown',
        icon: 'i-Financial',
        sub: [
          {icon: 'i-Money-2', name: 'Strategies', state: '/strategy', type: 'link'},
          {icon: 'i-Fingerprint-2', name: 'Monitoring', state: '/monitoring', type: 'link'},
          {icon: 'i-Left---Right', name: 'Strategy tester', state: '/strategy/tester', type: 'link'}
        ]
      },
      {
        name: 'Signals',
        type: 'link',
        icon: 'i-Bell',
        state: '/signal'
      },
      {
        name: 'Orders',
        type: 'link',
        icon: 'i-Money-Bag',
        state: '/signal'
      }
    ];
  }

}
