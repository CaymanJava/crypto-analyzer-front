import { Component, Input, OnInit } from '@angular/core';
import { TickData } from "../../core/tick/tick.model";

@Component({
  selector: 'app-stock-market-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() tickData: TickData;

  constructor() {
  }

  ngOnInit() {
  }

}
