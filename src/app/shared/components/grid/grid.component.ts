import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { GridColumnComponent } from './grid-column.component';
import { GridActionComponent } from './grid-action.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import * as moment from 'moment';
import { PageableParams, PageSlice, QuerySort } from "../../../core/api/api.model";


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [DatePipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
  page = 1;

  @Input() data: PageSlice;
  @Input() sort: QuerySort | null;

  @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;
  @ContentChildren(GridActionComponent) actions: QueryList<GridActionComponent>;

  @Output() pageableParamsChange: EventEmitter<PageableParams> = new EventEmitter();
  @Output() actionClick: EventEmitter<any> = new EventEmitter();
  @Output() sortChange: EventEmitter<QuerySort> = new EventEmitter<QuerySort>();

  constructor(private datePipe: DatePipe,
              private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.pageableParamsChange.emit({page: pageNumber - 1, size: this.data.size});
  }

  onActionClick(action: string, row: any) {
    this.actionClick.emit({action: action, row: row});
  }

  onSortClick(event: QuerySort) {
    this.columns.forEach(column => {
      if (event.order === column.key) {
        this.sort = {
          direction: event.direction === 'asc' ? 'desc' : 'asc',
          order: column.key
        };
      }
    });

    this.sortChange.emit(this.sort);
  }

  getValue(value: string, dataType: string) {
    if (value === null) {
      return '';
    }
    switch (dataType) {
      case ('string'):
        return value;
      case ('enum'):
        return value;
      case ('boolean'):
        return value;
      case ('date-time'):
        return this.datePipe.transform(value, 'yyyy-MM-dd HH:mm');
      case ('date'):
        return this.datePipe.transform(value, 'dd/MM/yyyy');
      case ('time'):
        return moment(value, 'HH:mm').format('HH:mm');
      case ('number'):
        return this.decimalPipe.transform(+value, '1.0-15');
    }
  }

  defineArrow(value: string, dataType: string) {
    if (dataType !== 'number') {
      return '';
    }

    if (+value > 0) {
      return 'i-Up1 text-success';
    } else {
      return 'i-Down1 text-danger';
    }
  }

  defineColor(value: string, dataType: string) {
    if (dataType !== 'number') {
      return '';
    }

    if (+value > 0) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }

}
