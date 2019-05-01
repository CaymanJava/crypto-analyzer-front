import { Component, ViewChild } from '@angular/core';
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";
import { NavigationService } from "./core/navigation/navigation.service";
import { ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";
import { SearchService } from "./core/search/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  moduleLoading: boolean;
  @ViewChild(PerfectScrollbarDirective) perfectScrollbar: PerfectScrollbarDirective;

  constructor(public navService: NavigationService,
              public searchService: SearchService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.moduleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.moduleLoading = false;
      }
    });
  }
}
