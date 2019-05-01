import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  id?: string;
  title?: string;
  description?: string;
  type: string;       // Possible values: link/dropDown/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: ChildItem[]; // Dropdown items
  badges?: Badge[];
  active?: boolean;
}

export interface ChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string;       // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: ChildItem[];
  active?: boolean;
}

interface Badge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

interface SidebarState {
  sideNavOpen?: boolean;
  childNavOpen?: boolean;
}

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
        state: '/stock/'
      },
      {
        name: 'Markets',
        type: 'link',
        icon: 'i-Bitcoin',
        state: '/market/'
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
