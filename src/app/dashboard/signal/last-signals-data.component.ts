import { Component, Input, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { echartStyles } from "../../shared/echart-styles";

@Component({
  selector: 'app-last-signals-data',
  templateUrl: './last-signals-data.component.html',
  styleUrls: ['./last-signals-data.component.css']
})
export class LastSignalsDataComponent implements OnInit {

  @Input() lastSignalsData: number[];

  lastSignalsOption: EChartOption;

  constructor() { }

  ngOnInit() {
    this.lastSignalsOption = {
      ...echartStyles.lineNoAxis, ...{
        series: [{
          data: this.lastSignalsData,
          lineStyle: {
            color: 'rgba(102, 51, 153, 0.86)',
            width: 3,
            ...echartStyles.lineShadow
          },
          label: {show: true, color: '#212121'},
          type: 'line',
          smooth: true,
          itemStyle: {
            borderColor: 'rgba(102, 51, 153, 1)'
          }
        }]
      }
    }
  }

}
