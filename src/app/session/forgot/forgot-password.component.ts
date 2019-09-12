import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [SharedAnimations]
})
export class ForgotPasswordComponent implements OnInit {

  animationConfig = {
    value: '*',
    params: {
      y: '120px',
      opacity: '0',
      delay: '100ms',
      duration: '400ms'
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

}
