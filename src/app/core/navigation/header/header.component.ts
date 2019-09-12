import { Component, OnInit } from '@angular/core';
import { NavigationService } from "../navigation.service";
import { SearchService } from "../../search/search.service";
import { AuthService } from "../../auth/auth.service";


@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  notifications: any[];

  constructor(private navService: NavigationService,
              public searchService: SearchService,
              private auth: AuthService) {
    this.notifications = [
      {
        icon: 'i-Speach-Bubble-6',
        title: 'New message',
        badge: '3',
        text: 'James: Hey! are you busy?',
        time: new Date(),
        status: 'primary',
        link: '/chat'
      },
      {
        icon: 'i-Receipt-3',
        title: 'New order received',
        badge: '$4036',
        text: '1 Headphone, 3 iPhone x',
        time: new Date('11/11/2018'),
        status: 'success',
        link: '/tables/full'
      },
      {
        icon: 'i-Empty-Box',
        title: 'Product out of stock',
        text: 'Headphone E67, R98, XL90, Q77',
        time: new Date('11/10/2018'),
        status: 'danger',
        link: '/tables/list'
      },
      {
        icon: 'i-Data-Power',
        title: 'Server up!',
        text: 'Server rebooted successfully',
        time: new Date('11/08/2018'),
        status: 'success',
        link: '/dashboard/v2'
      },
      {
        icon: 'i-Data-Block',
        title: 'Server down!',
        badge: 'Resolved',
        text: 'Region 1: Server crashed!',
        time: new Date('11/06/2018'),
        status: 'danger',
        link: '/dashboard/v3'
      }
    ];
  }

  ngOnInit() {
  }

  toggelSidebar() {
    this.navService.sidebarState.childNavOpen = false;
    this.navService.sidebarState.sideNavOpen = !this.navService.sidebarState.sideNavOpen;
  }

  signout() {
    this.auth.logout();
  }

}
