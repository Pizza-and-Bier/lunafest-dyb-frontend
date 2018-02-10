import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatButtonToggleChange } from "@angular/material";

import { Item } from '../models';

@Component({
  selector: 'dyb-place-a-bid',
  templateUrl: './place-a-bid.component.html',
  styleUrls: ['./place-a-bid.component.css']
})
export class PlaceABidComponent implements OnInit {

  public imageSrc: string;

  private bidForm: FormGroup;

  private formErrors: {[key: string]: any} = {
    "bidValue": ""
  };

  private validationMessages: {[key: string]: any} = {
    "bidValue": {
      "required": "Required."
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item, public dialogRef: MatDialogRef<PlaceABidComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.data);
    this.buildForm();
    this.getImageSource();
  }

  public getImageSource(): void {
    const keys = this.data.images.filter((elem) => {
      return elem !== null && elem !== undefined;
    });
    this.imageSrc = keys.pop();
  }

  public toggleBidValue(change: MatButtonToggleChange): void {

  }

  public placeBid(): void {
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.bidForm = this.fb.group({
      "bidValue": [0, [
        Validators.required
      ]]
    });

    this.bidForm.statusChanges.subscribe((data) => this.checkForm(data));
  }

  public checkForm(data?: any): void {
    if (!this.bidForm) { return; }
    const form = this.bidForm;
    
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
