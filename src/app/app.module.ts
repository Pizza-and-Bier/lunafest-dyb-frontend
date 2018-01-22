import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

import { MaterialModule } from "./material/material.module";

import { RoutingModule } from "./routing/routing.module";
 
import { ControlToolbarComponent } from './control-toolbar/control-toolbar.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlToolbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
