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

  public item: Item;

  public imageSrc: string;

  public bidComplete = false;

  public bidPlaced = false;

  public bidButtonValues: number[] = [];

  public bidToggleValue: number|string = 0;

  public showBidConflict = false;

  private bidForm: FormGroup;

  private formErrors: {[key: string]: any} = {
    "bidValue": ""
  };

  private validationMessages: {[key: string]: any} = {
    "bidValue": {
      "required": "Required.",
      "pattern": "Only whole dollar amounts allowed.",
      "positiveNumbersOnly": "Dollar ammounts cannot be negative."
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: Item, id: string, user?: User},
  public dialogRef: MatDialogRef<PlaceABidComponent>,
  private fb: FormBuilder,
  private bidService: PlaceABidService) { }

  ngOnInit() {
    console.log(this.data.id);
    this.getItem();
    this.buildForm();
  }

  public getImageSource(): void {
    const keys = this.item.images.filter((elem) => {
      return elem !== null && elem !== undefined;
    });
    this.imageSrc = keys[0];
  }

  public reBid(): void {
    this.bidComplete = false;
    this.showBidConflict = false;
    this.bidPlaced = false;
    this.getItem();
  }

  public toggleBidValue(change: number|string): void {
    const bidValueControl = this.bidForm.get("bidValue");
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
        overBidFloorValidator(this.item.bidFloor)
      ]);
      bidValueControl.setValue(0);
      bidValueControl.updateValueAndValidity();
    }
  }

  public placeBid(): void {
    this.bidPlaced = true;
    let total;
    if (this.item.currentBid !== undefined && this.item.currentBid !== null) {
      total = this.bidForm.get("bidValue").value + this.item.currentBid.amount;
    }
    else {
      total = this.bidForm.get("bidValue").value + this.item.openingBid;
    }
    this.bidService.placeBid(this.item.key, total).then(
      (data) => {
        if (this.data.user && this.data.user.following && this.data.user.following.indexOf(this.item.key) === -1) {
          this.bidService.followItem(this.item.key);
        }
        this.bidComplete = true;
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
      }
    ).catch((err) => {
      this.showBidConflict = true;
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private getItem(): void {
    this.bidService.getItem(this.data.id).subscribe(
      (itemData) => {
        console.log(this.item);
        this.item = itemData;
        this.getImageSource();
        this.setBidFloorValues();
        this.validationMessages["overBidFloor"] = `Bid should be above \$${this.item.bidFloor}`;
      }
    );
  }

  private setBidFloorValues(): void {
    const bidFloor = this.item.bidFloor;

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
    console.log("build form");
    this.bidForm = this.fb.group({
      "bidValue": [1, [
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
