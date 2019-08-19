import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { StrategySharedDataService } from "./strategy-shared-data.service";

@Injectable({
  providedIn: "root"
})
export class StrategyActivator implements CanDeactivate<any> {

  public constructor(private strategySharedDataService: StrategySharedDataService) {
  }

  public canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    if (!nextState.url.startsWith('/strategy')) {
      this.strategySharedDataService.clear();
    }
    return true;
  }

}
