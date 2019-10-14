import { TimeFrame } from "../tick/tick.model";

export class MemberSignal {
  id: number;
  positions: Position[];
  marketId: number;
  memberStrategyId: number;
  logoUrl: string;
  baseVolume: number;
  priceDiff: number;
  strategyType: string;
  timeFrame: TimeFrame;
  marketName: string;
  stock: string;
  strategyName: string;
  customStrategyName: string;
  tickTime: string;
  creationTime: string;
}

export enum Position {
  ENTRY_LONG,
  EXIT_LONG,
  ENTRY_SHORT,
  EXIT_SHORT
}
