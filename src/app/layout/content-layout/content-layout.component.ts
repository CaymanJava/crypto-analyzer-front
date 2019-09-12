import { Component, OnInit, ViewChild } from '@angular/core';
import { ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";
import { NavigationService } from "../../core/navigation/navigation.service";
import { SearchService } from "../../core/search/search.service";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html'
})
export class ContentLayoutComponent implements OnInit {

  moduleLoading: boolean;
  @ViewChild(PerfectScrollbarDirective, {static: false}) perfectScrollbar: PerfectScrollbarDirective;

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
