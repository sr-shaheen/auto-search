import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}
  getData(search): Observable<any> {
    return this.http.get<any>(`http://www.omdbapi.com/?s=${search}&apikey=c0df56cb&`).pipe(
      map(response =>
        response ? response : null
      ),
      catchError(error => of(null))
    );
  }
}
