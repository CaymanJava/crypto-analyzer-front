import { Tick } from "../tick/tick.model";

export class Signal {
  tick: Tick;
  positions: Set<string>;
  entryPrice: number;
  stopLose: number;
  firstTakeProfit: number;
  secondTakeProfit: number;
}

export enum Position {
  ENTRY_LONG,
  EXIT_LONG,
  ENTRY_SHORT,
  EXIT_SHORT
}
