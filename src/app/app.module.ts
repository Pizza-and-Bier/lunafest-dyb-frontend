import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { MaterialModule } from "./material/material.module";

import { ControlToolbarComponent } from './control-toolbar/control-toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlToolbarComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
