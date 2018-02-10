import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule, MatTabsModule, MatDividerModule, MatListModule, MatMenuModule, MatDialogModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
