import { GridColumnComponent } from "./grid-column.component";

export interface Sort {
  direction?: SortDirection;
  order: GridColumnComponent;
}

export enum Color {
  GREEN,
  BLUE,
  RED,
  ORANGE
}

export namespace Color {
  export function green(color: Color) {
    return Color.comparePaymentStatuses(color, Color.GREEN);
  }

  export function blue(color: Color) {
    return Color.comparePaymentStatuses(color, Color.BLUE);
  }

  export function red(color: Color) {
    return Color.comparePaymentStatuses(color, Color.RED);
  }

  export function orange(color: Color) {
    return Color.comparePaymentStatuses(color, Color.ORANGE);
  }

  export function comparePaymentStatuses(first, second) {
    const paymentStatusTypeValue = Color[first];
    if (typeof  paymentStatusTypeValue === 'number') {
      return paymentStatusTypeValue === second;
    } else {
      return paymentStatusTypeValue === Color[second];
    }
  }
}

export type SortDirection = "asc" | "desc";
