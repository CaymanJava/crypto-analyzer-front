import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from "../../shared/animations/shared-animations";

@Component({
  selector: 'app-session-layout',
  templateUrl: './session-layout.component.html',
  styleUrls: ['./session-layout.component.scss'],
  animations: [SharedAnimations]
})
export class SessionLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
