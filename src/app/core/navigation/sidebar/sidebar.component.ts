import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from "../navigation.model";
import { NavigationService } from "../navigation.service";
import { Utils } from "../../../shared/utils";

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  selectedItem: MenuItem;
  nav: MenuItem[];

  constructor(private router: Router,
              private navService: NavigationService) {
  }

  ngOnInit() {
    this.updateSidebar();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeChildNav();
        if (Utils.isMobile()) {
          this.navService.sidebarState.sideNavOpen = false;
        }
      });

    this.loadMenuItems();
  }

  selectItemAndOpenChildNav(item) {
    this.navService.sidebarState.childNavOpen = true;
    this.selectedItem = item;
    this.setActiveMainItem(item);
  }

  selectItemAndCloseChildNav(item) {
    this.navService.sidebarState.childNavOpen = false;
    this.selectedItem = item;
    this.setActiveMainItem(item);
  }

  closeChildNav() {
    this.navService.sidebarState.childNavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item) {
    this.setActiveMainItem(item);
  }

  setActiveMainItem(item) {
    this.nav.forEach(item => {
      item.active = false;
    });
    item.active = true;
  }

  setActiveFlag() {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      this.nav.forEach(item => {
        item.active = false;
        if (activeRoute.indexOf(item.state) !== -1) {
          this.selectedItem = item;
          item.active = true;
        }
        if (item.sub) {
          item.sub.forEach(subItem => {
            subItem.active = false;
            if (activeRoute.indexOf(subItem.state) !== -1) {
              this.selectedItem = item;
              item.active = true;
            }
            if (subItem.sub) {
              subItem.sub.forEach(subChildItem => {
                if (activeRoute.indexOf(subChildItem.state) !== -1) {
                  this.selectedItem = item;
                  item.active = true;
                  subItem.active = true;
                }
              });
            }
          });
        }
      });
    }
  }

  updateSidebar() {
    if (Utils.isMobile()) {
      this.navService.sidebarState.sideNavOpen = false;
      this.navService.sidebarState.childNavOpen = false;
    } else {
      this.navService.sidebarState.sideNavOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateSidebar();
  }

  private loadMenuItems() {
    this.navService.menuItems$
      .subscribe((items) => {
        this.nav = items;
        this.setActiveFlag();
      });
  }

}
