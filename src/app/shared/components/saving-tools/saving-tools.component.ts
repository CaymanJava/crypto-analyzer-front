import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-saving-tools',
  templateUrl: './saving-tools.component.html'
})
export class SavingToolsComponent implements OnInit {

  @Output() onSave: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save(type: string){
    this.onSave.emit(type);
  }

}
