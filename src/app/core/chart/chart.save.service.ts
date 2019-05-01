import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChartSaveService {

  save(ext: string, chart: any, fileName: string) {
    switch (ext) {
      case 'svg': {
        this.saveSvg(chart, fileName);
        break;
      }
      case 'jpg': {
        this.saveJpg(chart, fileName);
        break;
      }
      case 'png': {
        this.savePng(chart, fileName);
        break
      }
      case 'pdf': {
        this.savePdf(chart, fileName);
        break;
      }
      case 'csv': {
        this.saveCsv(chart, fileName);
        break;
      }
      case 'xls': {
        this.saveXls(chart, fileName);
        break
      }
      default: /*NOP*/
    }
  }

  private saveSvg(chart: any, fileName: string) {
    chart.saveAsSvg({
        "filename": fileName
      }
    );
  }

  private saveJpg(chart: any, fileName: string) {
    chart.saveAsJpg({
        "forceTransparentWhite": false,
        "filename": fileName
      }
    );
  }

  private savePng(chart: any, fileName: string) {
    chart.saveAsPng({
        "filename": fileName
      }
    );
  }

  private savePdf(chart: any, fileName: string) {
    chart.saveAsPdf({
        "filename": fileName
      }
    );
  }

  private saveCsv(chart: any, fileName: string) {
    chart.saveAsCsv("raw",
      {
        "rowsSeparator": "\n",
        "columnsSeparator": ","
      },
      fileName
    );
  }

  private saveXls(chart: any, fileName: string) {
    chart.saveAsXlsx('default', fileName);
  }

}
