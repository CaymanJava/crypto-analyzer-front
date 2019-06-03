import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-moving-average-short-picker',
  templateUrl: './moving-average-short-picker.component.html'
})
export class MovingAverageShortPickerComponent implements OnInit {

  @Input() configForm: FormGroup;
  @Input() key: string;
  @Input() label = 'Moving average type';


  constructor() { }

  ngOnInit() {
  }

}
