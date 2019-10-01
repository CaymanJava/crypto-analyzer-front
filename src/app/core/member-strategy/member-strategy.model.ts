import { TimeFrame } from "../tick/tick.model";

export class MemberStrategy {
  id: number;
  marketId: number;
  strategyConfiguration: string;
  drawConfiguration: string;
  strategyType: string;
  timeFrame: TimeFrame;
  updateTimeUnit: TimeUnit;
  updateTimeValue: number;
  marketName: string;
  stock: string;
  strategyName: string;
  customStrategyName: string;
  status: MemberStrategyStatus;
  cycleCount: number;
  failedCount: number;
  stoppedReason: string;
  nextExecutionTime: string;
  lastExecutionTime: string;
  lastSignalTickTime: string;
  lastSignalPosition: string;
}

export class MemberStrategyRequest {
  marketId: number;
  strategyConfiguration: string;
  drawConfiguration: string;
  strategyType: string;
  timeFrame: string;
  updateTimeUnit: string;
  updateTimeValue: number;
  marketName: string;
  stock: string;
  strategyName: string;
  customStrategyName: string;

  setStrategyConfiguration(strategyConfiguration: any) {
    this.strategyConfiguration = JSON.stringify(strategyConfiguration);
  }

  setDrawConfiguration(drawConfiguration: any) {
    this.drawConfiguration = JSON.stringify(drawConfiguration);
  }
}

export class MemberStrategyCreateRequest extends MemberStrategyRequest {
  immediatelyStart: boolean;
}

export class MemberStrategyUpdateRequest extends MemberStrategyRequest {
  status: string;
}

export enum TimeUnit {
  MINUTE,
  HOUR,
  DAY
}

export enum MemberStrategyStatus {
  ACTIVE,
  PAUSED,
  FAILED,
  STOPPED
}

export namespace MemberStrategyStatus {
  export function isActive(status: MemberStrategyStatus) {
    return MemberStrategyStatus.comparePaymentStatuses(status, MemberStrategyStatus.ACTIVE);
  }

  export function isPaused(status: MemberStrategyStatus) {
    return MemberStrategyStatus.comparePaymentStatuses(status, MemberStrategyStatus.PAUSED);
  }

  export function isFailed(status: MemberStrategyStatus) {
    return MemberStrategyStatus.comparePaymentStatuses(status, MemberStrategyStatus.FAILED);
  }

  export function isStopped(status: MemberStrategyStatus) {
    return MemberStrategyStatus.comparePaymentStatuses(status, MemberStrategyStatus.STOPPED);
  }


  export function comparePaymentStatuses(first, second) {
    const paymentStatusTypeValue = MemberStrategyStatus[first];
    if (typeof paymentStatusTypeValue === 'number') {
      return paymentStatusTypeValue === second;
    } else {
      return paymentStatusTypeValue === MemberStrategyStatus[second];
    }
  }
}
