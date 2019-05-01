import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drawing-tools',
  templateUrl: './drawing-tools.component.html',
  styleUrls: ['./drawing-tools.component.scss']
})
export class DrawingToolsComponent implements OnInit {

  drawType;
  color = '#2722d8';

  @Output() drawToolSelected: EventEmitter<{drawType: string, color: string}> = new EventEmitter();
  @Output() removeSelectedTool: EventEmitter<void> = new EventEmitter();
  @Output() clearAll: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  startDrawing() {
    this.drawToolSelected.emit({drawType: this.drawType, color: this.color});
  }

  removeSelected(){
    this.removeSelectedTool.emit();
  }

  clear() {
    this.clearAll.emit();
  }

}
