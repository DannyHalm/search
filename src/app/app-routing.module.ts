import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path:"", component:MainComponent},
  {path:"search", component:SearchComponent},
  {path:"searchBody", component:Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
