import { Injectable } from "@angular/core";
import { Signal } from "./signal.model";
import { SignalDrawProviderService } from "./signal-draw-provider.service";

@Injectable({
  providedIn: "root"
})
export class SignalDrawService {

  constructor(private signalDrawProviderService: SignalDrawProviderService) {
  }

  draw(signals: Signal[], drawConfiguration: any, chart: any, requiredPositions: string[]) {
    requiredPositions.forEach(position => this.signalDrawProviderService.get(position).draw(signals, drawConfiguration, chart))
  }

}
