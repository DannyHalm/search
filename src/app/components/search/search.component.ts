import { MapType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import { Breed } from 'src/app/interfaces/breed.interface';
import { DogInfoInterface } from 'src/app/interfaces/doginfo.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
      searchSubject$ = new Subject<string>();
      allBreeds$ = new Subject<Breed[]>();
      breedInfo$ = new Subject<DogInfoInterface[]>();
      results$ = new Observable<Breed[]>();
      searchString:string ="";
  constructor(private searchService:SearchService) {
  }

  ngOnInit(): void {
      this.searchSubject$.pipe((
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((text: string) => {
          return this.searchService.searchForTerm(text);
        }))
        ).subscribe({
            next:(
                  tap((res) => console.log('All breeds:',res)),
                  (res:Breed[]) => {this.allBreeds$.next(res)
                   this.getExtraInfo()}
                  ),
            error: (error:any) => console.log(error),
            complete:()=> console.log("Done retrieving Breeds")
       })
  }

  update($event:any){
    const value = $event.target.value;
    this.searchString = value;
    this.searchSubject$.next(this.searchString)
  }

 getExtraInfo(){
    this.searchService.searchExtraInfo(this.searchString)
     .subscribe(
       {
        next:(resultInfo:DogInfoInterface[]) => {
          // console.log("received breed info", resultInfo);
          this.breedInfo$.next(resultInfo);},
        error:(error:any)=> console.log(error),
        complete:()=> console.log(`Done retrieving info about ${this.searchString}`)
       }
      );
  }
}

