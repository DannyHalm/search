import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, Observable, take } from 'rxjs';
// import {DebounceTime} from 'rxjs/operator';
import { Breed } from '../interfaces/breed.interface';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) {
   }

  searchForTerm(searchString:string): Observable<any>{
    return this.http.get<Breed>(`https://dog.ceo/api/breed/${searchString}/images`).pipe(
      map((breed) => {
      console.log(breed);  
      return breed.message;
    }));
  }

  // searchAllBreads() : Observable<Breed>{
  //   return this.http.get<Breed>(`https://dog.ceo/api/breeds/list/all`).pipe(
  //     map((breeds) => {breeds.map((breed)=> return breed;}
  //     )
  //     }));
  // }
}
