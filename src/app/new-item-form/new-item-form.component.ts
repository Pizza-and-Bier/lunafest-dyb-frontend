import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Item } from "../models";
import { positiveNumbersOnly } from "./positive-numbers-only.validators";

@Component({
  selector: 'dyb-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css']
})
export class NewItemFormComponent implements OnInit {

  public newItemForm: FormGroup;

  @Input() existingData: Item|null;

  @Output() save: EventEmitter<any> = new EventEmitter();

  @Output() cancel: EventEmitter<void> = new EventEmitter();

  public formErrors: any = {
    "name": "",
    "description": "",
    "estimatedWorth": "",
    "openingBid": "",
    "bidFloor": "",
    "donorInfo": ""
  };

  private validationMessages: any = {
    "name": {
      "required": "Required."
    },
    "description": {

    },
    "estimatedWorth": {
      "positiveNumbersOnly": "Only positive numbers allowed for dollar amounts.",
      "pattern": "Invalid dollar amount."
    },
    "openingBid": {
      "required": "Required.",
      "positiveNumbersOnly": "Only positive numbers allowed for dollar amounts.",
      "pattern": "Invalid dollar amount."
    },
    "bidFloor": {
      "required": "Required.",
      "positiveNumbersOnly": "Only positive numbers allowed for dollar amounts.",
      "pattern": "Invalid dollar amount."
    },
    "donorInfo": {

    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  public saveForm(): void {
    this.save.emit(this.newItemForm.value);
  }

  public cancelForm(): void {
    this.cancel.emit();
  }

  private buildForm(): void {
    this.newItemForm = this.fb.group({
      "name": ["", [
        Validators.required
      ]],
      "description": ["", [

      ]],
      "estimatedWorth": [1, [
        positiveNumbersOnly,
        Validators.pattern(/^[0-9]+\.?[0-9]{0,2}$/)
      ]],
      "openingBid": [1, [
        Validators.required,
        positiveNumbersOnly,
        Validators.pattern(/^[0-9]+\.?[0-9]{0,2}$/)
      ]],
      "bidFloor": [1, [
        Validators.required,
        positiveNumbersOnly,
        Validators.pattern(/^[0-9]+\.?[0-9]{0,2}$/)
      ]],
      "donorInfo": ["", [

      ]]
    });

    this.newItemForm.statusChanges.subscribe((data) => {
      this.onValueChanged(data);
    });
    this.onValueChanged();
  }

  private onValueChanged(data?: any): void {
    if (!this.newItemForm) { return; }
    const form = this.newItemForm;
    for (const field in this.formErrors) {
      if (form.get(field) !== null && form.get(field) !== undefined) {
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
}
