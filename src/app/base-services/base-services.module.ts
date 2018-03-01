import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { environment } from '../../environments/environment';
import { BaseItemService } from './item.service';
import { BaseAuthService } from './auth.service';
import { BaseUserService } from "./user.service";
import { BaseImageService } from "./image.service";
import { BaseAuctionService } from "./auction.service";

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [],
  providers: [
      BaseItemService,
      BaseAuthService,
      BaseUserService,
      BaseImageService,
      BaseAuctionService
  ]
})
export class BaseServicesModule { }
