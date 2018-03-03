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
        MatCheckboxModule,
        MatGridListModule,
        MatExpansionModule,
        MatTooltipModule
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
    MatMenuModule,
    MatGridListModule,
    MatExpansionModule,
    MatTooltipModule
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
    MatMenuModule,
    MatGridListModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }
