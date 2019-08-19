import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedAnimations } from "../../shared/animations/shared-animations";
import { fromEvent, Subscription } from "rxjs";
import { Strategy } from "../../core/strategy/strategy.model";
import { StrategyService } from "../../core/strategy/strategy.service";
import { debounceTime } from "rxjs/operators";
import { StrategySharedDataService } from "../../core/strategy/strategy-shared-data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.scss'],
  animations: [SharedAnimations]
})
export class StrategyListComponent implements OnInit, OnDestroy {

  page = 1;
  pageSize = 8;
  strategies: Strategy[];
  allStrategies: Strategy[];
  strategySubscription: Subscription;
  searchSubscription: Subscription;

  @ViewChild('searchStrategy') search: ElementRef;

  constructor(private strategiesService: StrategyService,
              private strategySharedDataService: StrategySharedDataService,
              private route: Router) {
  }

  ngOnInit() {
    this.strategySubscription = this.strategiesService.getStrategies()
      .subscribe((strategies: Strategy[]) => {
        this.strategies = this.allStrategies = strategies;
      });
    this.subscribeToSearching();
  }

  ngOnDestroy() {
    this.strategySubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  onStrategyClick(strategy: Strategy) {
    this.strategySharedDataService.strategy = strategy;
    this.route.navigate([this.strategySharedDataService.resolveRoutePath()]);
  }

  subscribeToSearching() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        const request = this.search.nativeElement.value.trim().toLocaleLowerCase();
        this.strategies = this.allStrategies.filter(strategy => {
          return strategy.name.toLocaleLowerCase().search(request) != -1
          || strategy.description.toLocaleLowerCase().search(request) != -1
        });
      });
  }

}
