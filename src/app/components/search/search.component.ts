import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { Breed } from 'src/app/interfaces/breed.interface';
import { DogInfoInterface } from 'src/app/interfaces/doginfo.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
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
        debounceTime(1000),
        distinctUntilChanged()
      )).subscribe((d)=>{
        this.queryForBreed(d);
      });

  }

  update($event:any){
    const value = $event.target.value;
    this.searchString = value;
    this.searchSubject$.next(value)
  }

  queryForBreed(searchString:string): void {
     this.searchService.searchForTerm(searchString)
      .subscribe(
       {
        next:(response) => {
          console.log("new response:",response);
          this.allBreeds$.next(response);},
        error:(error:any)=> console.log(error),
        complete:()=> console.log("Done retrieving Breeds")
       }
      );
  }
  getExtraInfo(){
    this.searchService.searchExtraInfo(this.searchString)
     .subscribe(
       {
        next:(resultInfo:DogInfoInterface[]) => {
          console.log("received breed info", resultInfo);
          this.breedInfo$.next(resultInfo);},
        error:(error:any)=> console.log(error),
        complete:()=> console.log(`Done retrieving info about ${this.searchString}`)
       }
      );
  }
    queryAllBreed():void {
     //this.searchService.searchAllBreads();
      // .subscribe({
      //   next:(response) => this.allBreeds$.next(response),
      //   error:(error:any)=> console.log(error),
      //   complete:()=> console.log("Done retrieving Breeds")
      // })
      ;
    }
}
