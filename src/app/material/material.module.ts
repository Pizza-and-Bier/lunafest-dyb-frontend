import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule,
        MatMenuModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatCheckboxModule
       } from "@angular/material";

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
    MatDialogModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule
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
    MatDialogModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  declarations: []
})
export class MaterialModule { }
