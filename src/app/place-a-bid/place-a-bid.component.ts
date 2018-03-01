import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatButtonToggleChange } from "@angular/material";

import { Item, User } from '../models';
import { PlaceABidService } from './place-a-bid.service';
import { positiveNumbersOnly } from '../new-item-form/positive-numbers-only.validators';
import { overBidFloorValidator } from '../util/over-bid-floor-validator';

@Component({
  selector: 'dyb-place-a-bid',
  templateUrl: './place-a-bid.component.html',
  styleUrls: ['./place-a-bid.component.scss']
})
export class PlaceABidComponent implements OnInit {

  public imageSrc: string;

  public bidComplete = false;

  public bidPlaced = false;

  public bidButtonValues: number[] = [];

  public bidToggleValue: number|string = 0;

  private bidForm: FormGroup;

  private formErrors: {[key: string]: any} = {
    "bidValue": ""
  };

  private validationMessages: {[key: string]: any} = {
    "bidValue": {
      "required": "Required.",
      "pattern": "Only whole dollar amounts allowed.",
      "positiveNumbersOnly": "Dollar ammounts cannot be negative.",
      "overBidFloor": `Bid should be above \$${this.data.item.bidFloor}`
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: Item, id: string, user?: User},
  public dialogRef: MatDialogRef<PlaceABidComponent>,
  private fb: FormBuilder,
  private bidService: PlaceABidService) { }

  ngOnInit() {
    console.log(this.data);
    this.buildForm();
    this.getImageSource();
    this.setBidFloorValues();
  }

  public getImageSource(): void {
    const keys = this.data.item.images.filter((elem) => {
      return elem !== null && elem !== undefined;
    });
    this.imageSrc = keys[0];
    console.log(this.imageSrc);
  }

  public toggleBidValue(change: number|string): void {
    const bidValueControl = this.bidForm.get("bidValue");
    console.log(change);
    this.bidToggleValue = change;
    if (change !== 'other') {
      bidValueControl.clearValidators();
      bidValueControl.setValue(change);
      bidValueControl.updateValueAndValidity();
    }
    else {
      bidValueControl.setValidators([
        Validators.required,
        positiveNumbersOnly,
        Validators.pattern(/^[0-9]+$/),
        overBidFloorValidator(this.data.item.bidFloor)
      ]);
      bidValueControl.setValue(0);
      bidValueControl.updateValueAndValidity();
    }
  }

  public placeBid(): void {
    this.bidPlaced = true;
    let total;
    if (this.data.item.currentBid !== undefined && this.data.item.currentBid !== null) {
      total = this.bidForm.get("bidValue").value + this.data.item.currentBid.amount;
    }
    else {
      total = this.bidForm.get("bidValue").value + this.data.item.openingBid;
    }
    console.log(this.data.item);
    this.bidService.placeBid(this.data.item.key, total).then(
      (data) => {
        if (this.data.user && this.data.user.following.indexOf(this.data.item.key) === -1) {
          this.bidService.followItem(this.data.item.key);
        }
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

  private setBidFloorValues(): void {
    const bidFloor = this.data.item.bidFloor;

    if (bidFloor !== undefined && bidFloor !== null) {
      let factor = 1;
      while (this.bidButtonValues.length < 3) {
        if (factor >= bidFloor) {
          this.bidButtonValues.push(factor);
        }
        factor *= 5;
      }
    }
    else {
      this.bidButtonValues = [1, 5, 10];
    }
  }

  private buildForm(): void {
    this.bidForm = this.fb.group({
      "bidValue": [0, [
      ]]
    });

    this.bidForm.statusChanges.subscribe((data) => this.checkForm(data));
  }

  private checkForm(data?: any): void {
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
