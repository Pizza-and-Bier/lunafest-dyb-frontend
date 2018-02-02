import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { environment } from '../../environments/environment';
import { BackendItemsService } from './item-list.service';
import { AuthService } from './auth.service';
import { UserService } from "./user.service";

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [],
  providers: [
      BackendItemsService,
      AuthService,
      UserService
  ]
})
export class FirebaseServicesModule { }
