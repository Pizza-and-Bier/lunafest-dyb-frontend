import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatButtonToggleChange } from "@angular/material";

import { Item } from '../models';
import { PlaceABidService } from './place-a-bid.service';

@Component({
  selector: 'dyb-place-a-bid',
  templateUrl: './place-a-bid.component.html',
  styleUrls: ['./place-a-bid.component.css']
})
export class PlaceABidComponent implements OnInit {

  public imageSrc: string;

  public bidComplete = false;

  public bidPlaced = false;

  private bidForm: FormGroup;

  private formErrors: {[key: string]: any} = {
    "bidValue": ""
  };

  private validationMessages: {[key: string]: any} = {
    "bidValue": {
      "required": "Required."
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: Item, id: number},
  public dialogRef: MatDialogRef<PlaceABidComponent>,
  private fb: FormBuilder,
  private bidService: PlaceABidService) { }

  ngOnInit() {
    console.log(this.data);
    this.buildForm();
    this.getImageSource();
  }

  public getImageSource(): void {
    const keys = this.data.item.images.filter((elem) => {
      return elem !== null && elem !== undefined;
    });
    this.imageSrc = keys.pop();
  }

  public toggleBidValue(change: MatButtonToggleChange): void {

  }

  public placeBid(): void {
    this.bidPlaced = true;
    const total = this.bidForm.get("bidValue").value + this.data.item.currentBid.amount;
    this.bidService.placeBid(this.data.id, total).then(
      (data) => {
        this.bidPlaced = false;
        console.log(data);
        this.bidComplete = true;
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
      }
    );
  }

  public cancel(): void {
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
