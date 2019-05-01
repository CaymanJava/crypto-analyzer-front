import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GridColumnComponent } from "./grid-column.component";
import { QuerySort } from "../../../core/api/api.model";

@Component({
  selector: 'grid-header',
  template: `
    <i *ngIf="column.sorted" class="pointer" type="" style="cursor:pointer" (click)="onSortClick()">
      <i *ngIf="active && direction == 'asc'" class="i-Arrow-Down-2"></i>
      <i *ngIf="active && direction == 'desc'" class="i-Arrow-Up-2"></i>
    </i>
    <ng-template [ngIf]="column.title">
      {{column.title}}
    </ng-template>
  `
})
export class GridHeaderComponent implements OnInit, OnChanges {
  @Input('column') column: GridColumnComponent;
  @Input('sort') sort: QuerySort | null;
  @Output('changeSort') changeSort: EventEmitter<any> = new EventEmitter();
  direction: string | null = null;
  active = false;

  ngOnInit() {
    if (this.sort && this.column.sorted) {
      this.active = true;
      this.direction = this.sort.direction;
    }
  }

  ngOnChanges(): void {
    if (this.sort && this.sort.order === this.column.key) {
      this.active = true;
      this.direction = this.sort.direction;
    }
  }

  onSortClick() {
    this.changeSort.emit({direction: this.direction, order: this.column.key});
  }

}
