import { Injectable } from "@angular/core";
import { Signal } from "./signal.model";

@Injectable({
  providedIn: "root"
})
export class SignalBuilderService {

  buildSignals(strategyResults: any[]) {
    const signalResults = [];
    strategyResults.forEach(strategyResult => signalResults.push(this.buildStrategyResult(strategyResult)));
    return signalResults;
  }

  private buildStrategyResult(strategyResult: any) {
    const signal = new Signal();
    signal.tick = strategyResult.tick;
    signal.positions = this.buildPositions(strategyResult);
    signal.entryPrice = strategyResult.entryPrice;
    signal.stopLose = strategyResult.stopLose;
    signal.firstTakeProfit = strategyResult.firstTakeProfit;
    signal.secondTakeProfit = strategyResult.secondTakeProfit;
    return signal;
  }

  private buildPositions(strategyResult: any): Set<string> {
    if (strategyResult.positions === null || strategyResult.positions.length === 0) {
      return new Set();
    }

    const positions = new Set<string>();
    strategyResult.positions.forEach(position => positions.add(position));

    return positions;
  }

}
