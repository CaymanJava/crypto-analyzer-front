import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule {

}
