import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimpleStatComponent } from './simple-stat/simple-stat.component';

import { HttpModule } from '@angular/http';
import { RequestManagerService } from "./services/request-manager.service";
import { NavbarComponent } from './navbar/navbar.component';

import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    SimpleStatComponent,
    NavbarComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    RequestManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
