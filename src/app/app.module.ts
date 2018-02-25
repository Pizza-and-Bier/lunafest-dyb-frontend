import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { AngularFireStorageModule } from 'angularfire2/storage';

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemItemsService } from "./in-mem-db/in-mem-items.service";

import { AppComponent } from './app.component';

import { MaterialModule } from "./material/material.module";

import { RoutingModule } from "./routing/routing.module";

import { BaseServicesModule } from "./base-services/base-services.module";

import { ItemService } from "./services/item.service";
import { ItemListService } from "./item-list/item-list.service";
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { UserBidService } from './my-bids/user-bid.service';
import { RegistrationService } from "./services/registration.service";

import { PhoneNumberFormatter } from "./util/directives/phone-number-formatter.directive";

import { ControlToolbarComponent } from './control-toolbar/control-toolbar.component';
import { LoginComponent } from './login/login.component';
import { fakeBackendProvider } from "./mocks/fake-backend-interceptor";
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MyBidsComponent } from "./my-bids/my-bids.component";
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlToolbarComponent,
    LoginComponent,
    AuthWrapperComponent,
    ItemListComponent,
    MyBidsComponent,
    RegistrationComponent,
    PhoneNumberFormatter
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemItemsService),
    BaseServicesModule,
    AngularFireStorageModule
  ],
  providers: [
    LoginService,
    ItemService,
    ItemListService,
    UserService,
    UserBidService,
    RegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
