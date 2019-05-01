import { GridColumnComponent } from "./grid-column.component";

export interface Sort {
  direction?: SortDirection;
  order: GridColumnComponent;
}

export type SortDirection = "asc" | "desc";
