import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-drawing-tools',
  templateUrl: './drawing-tools.component.html',
  styleUrls: ['./drawing-tools.component.scss']
})
export class DrawingToolsComponent implements OnInit {

  drawType;
  marker;
  thickness = 1;
  dash = '1 1';
  color = '#2722d8';
  strokeColor = '#9f10d8';
  markerColor = '#20b0d8';

  markerSize: number = 10;

  @Output() drawToolSelected: EventEmitter<{ drawType: string, color: string, thickness: number, dash: string, strokeColor: string }> = new EventEmitter();
  @Output() markerSelected: EventEmitter<{ marker: string, color: string, size: number }> = new EventEmitter();
  @Output() removeSelectedTool: EventEmitter<void> = new EventEmitter();
  @Output() clearAll: EventEmitter<void> = new EventEmitter();

  @ViewChildren('drawTypeButton') drawButtons: Set<ElementRef>;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  onDrawConfigChange() {
    this.emitDrawConfigChanges();
  }

  onDrawTypeButtonClick(drawType: string) {
    if (this.drawType === drawType) {
      this.drawType = null;
    } else {
      this.drawType = drawType;
    }
    this.refreshButtons();

    this.emitDrawConfigChanges();
  }

  refreshButtons() {
    this.drawButtons.forEach(drawButton => {
      const dataAnnotationType = drawButton.nativeElement.getAttribute('data-annotation-type');
      if (dataAnnotationType == this.drawType) {
        if (!drawButton.nativeElement.getAttribute('class').includes('active')) {
          this.renderer.addClass(drawButton.nativeElement, 'active');
        }
      } else {
        this.renderer.removeClass(drawButton.nativeElement, 'active');
      }
    })
  }

  removeSelected() {
    this.removeSelectedTool.emit();
  }

  clear() {
    this.clearAll.emit();
  }

  emitMarkerConfigChange() {
    if (this.marker !== null) {
      this.markerSelected.emit({
        marker: this.marker,
        color: this.markerColor,
        size: this.markerSize
      });
    }
  }

  markerSizeChange(size: number) {
    this.markerSize = size;
    this.emitMarkerConfigChange();
  }

  markerChange(marker: string) {
    this.marker = marker;
    this.emitMarkerConfigChange();
  }

  private emitDrawConfigChanges() {
    if (this.drawType != null) {
      this.drawToolSelected.emit({
        drawType: this.drawType,
        color: this.color,
        thickness: this.thickness,
        dash: this.dash,
        strokeColor: this.strokeColor
      });
    }
  }

}
