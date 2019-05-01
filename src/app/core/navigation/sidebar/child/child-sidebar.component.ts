import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { NavigationService } from "../../navigation.service";
import { MenuItem } from "../../navigation.model";

@Component({
  selector: 'app-child',
  templateUrl: './child-sidebar.component.html'
})
export class ChildSidebarComponent implements OnInit {

  @Input() selectedItem: MenuItem;
  @Output() closeChild = new EventEmitter<void>();

  constructor(private router: Router,
              private navService: NavigationService) { }

  ngOnInit() {
  }

  closeChildNav() {
    this.closeChild.emit();
  }

}
