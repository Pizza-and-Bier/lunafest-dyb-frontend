import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';

import { MaterialModule } from "./material/material.module";

import { RoutingModule } from "./routing/routing.module";

import { BaseServicesModule } from "./base-services/base-services.module";

import { LoginService } from "./services/login.service";
import { ItemListService } from "./item-list/item-list.service";
import { UserBidService } from './my-bids/user-bid.service';
import { RegistrationService } from "./registration/registration.service";
import { PlaceABidService } from "./place-a-bid/place-a-bid.service";
import { NewItemService } from "./new-item/new-item.service";
import { EditItemService } from './edit-item/edit-item.service';
import { AuctionAdminService } from './auction-admin/auction-admin.service';

import { PhoneNumberFormatter } from "./util/directives/phone-number-formatter.directive";

import { CategoriesPipe } from './util/pipes/categories.pipe';

import { LoginComponent } from './login/login.component';
import { fakeBackendProvider } from "./mocks/fake-backend-interceptor";
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MyBidsComponent } from "./my-bids/my-bids.component";
import { RegistrationComponent } from './registration/registration.component';
import { PlaceABidComponent } from './place-a-bid/place-a-bid.component';
import { OnlyNumberDirective } from './util/directives/only-number.directive';
import { NewItemComponent } from './new-item/new-item.component';
import { AuctionWrapperComponent } from './auction-wrapper/auction-wrapper.component';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemCardGalleryComponent } from './item-card-gallery/item-card-gallery.component';
import { ItemListFilterDialogComponent } from './item-list-filter-dialog/item-list-filter-dialog.component';
import { AuctionAdminComponent } from './auction-admin/auction-admin.component';
import { AuthGuard } from './routing/auth.guard';
import { AuctionClosedComponent } from './auction-closed/auction-closed.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthWrapperComponent,
    ItemListComponent,
    MyBidsComponent,
    RegistrationComponent,
    PhoneNumberFormatter,
    PlaceABidComponent,
    OnlyNumberDirective,
    NewItemComponent,
    AuctionWrapperComponent,
    NewItemFormComponent,
    ConfirmDialogComponent,
    EditItemComponent,
    ItemCardGalleryComponent,
    ItemListFilterDialogComponent,
    CategoriesPipe,
    AuctionAdminComponent,
    AuctionClosedComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    BaseServicesModule,
    AngularFireStorageModule
  ],
  providers: [
    LoginService,
    ItemListService,
    UserBidService,
    RegistrationService,
    PlaceABidService,
    NewItemService,
    EditItemService,
    AuctionAdminService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ PlaceABidComponent, ConfirmDialogComponent, ItemListFilterDialogComponent ]
})
export class AppModule { }
