import { Injectable } from "@angular/core";
import { EntryLongSignalDrawService } from "./entry-long-signal-draw.service";
import { EntryShortSignalDrawService } from "./entry-short-signal-draw.service";
import { ExitLongSignalDrawService } from "./exit-long-signal-draw.service";
import { ExitShortSignalDrawService } from "./exit-short-signal-draw.service";
import { CommonSignalDrawService } from "./common-signal-draw.service";

@Injectable({
  providedIn: "root"
})
export class SignalDrawProviderService {

  constructor(private entryLongSignalDrawService: EntryLongSignalDrawService,
              private entryShortSignalDrawService: EntryShortSignalDrawService,
              private exitLongSignalDrawService: ExitLongSignalDrawService,
              private exitShortSignalDrawService: ExitShortSignalDrawService) {
  }


  get(position: string): CommonSignalDrawService {
    switch (position) {
      case 'ENTRY_LONG':
        return this.entryLongSignalDrawService;
      case 'ENTRY_SHORT':
        return this.entryShortSignalDrawService;
      case 'EXIT_LONG':
        return this.exitLongSignalDrawService;
      case 'EXIT_SHORT':
        return this.exitShortSignalDrawService;
      default:
        return null;
    }
  }

}
