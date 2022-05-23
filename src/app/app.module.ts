import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchService } from './services/search.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
