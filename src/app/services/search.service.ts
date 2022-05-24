import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Breed } from '../interfaces/breed.interface';
import { DogInfoInterface } from '../interfaces/doginfo.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) {
   }

  searchForTerm(searchString:string): Observable<any>{
    return this.http.get<Breed>(`https://dog.ceo/api/breed/${searchString}/images`)
    .pipe(
      map((breed) => {
      // console.log(breed);
      return breed.message;
    }))
    ;
  }

  searchExtraInfo(breed:String):Observable<DogInfoInterface[]>{
    let dogRequestHeader = new HttpHeaders({
      'Content-Type':'application/json'
    });
    dogRequestHeader.set('x-api-key',environment.dogInfoAPI);
    return this.http.get<DogInfoInterface[]>(environment.dogInfoURL+`${breed}`, {headers:dogRequestHeader});
  }
}
