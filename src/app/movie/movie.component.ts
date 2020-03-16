import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/movie.service';
import { Subscription, Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  getMovieSub: Subscription;
  showData: any;
  filteredServices: Observable<any>;
  movieName = new FormControl();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.filteredServices = this.movieName.valueChanges.pipe(
      startWith(""),
      debounceTime(3000),
      switchMap((value: string) => {
        if (value !== "") {
          return this.dataService.getData(
            value,
          );
        } else {
          return of(null);
        }
      })
    );

    this.filteredServices.subscribe(item => {
      item ? this.showData = item.Search : this.showData = [];
    })
  }


  ngOnDestroy(): void {
    if (this.getMovieSub) {
      this.getMovieSub.unsubscribe();
    }
  }
}

interface Data {
  Search: [],
}
