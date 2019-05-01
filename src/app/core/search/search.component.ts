import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SearchService } from "./search.service";
import { SharedAnimations } from "../../shared/animations/shared-animations";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  animations: [SharedAnimations]
})
export class SearchComponent implements OnInit {
  page = 1;
  pageSize = 6;

  results$: Observable<any[]>;
  searchCtrl: FormControl = new FormControl('');

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    // this.results$ = combineLatest(
    //   this.searchCtrl.valueChanges
    //     .pipe(startWith(''), debounceTime(200))
    // )
    //   .pipe(map(([stocks, searchTerm]) => {
    //     return stocks.filter(p => {
    //       return p.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    //     });
    //   }));
  }

}
