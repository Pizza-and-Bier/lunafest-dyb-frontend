import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Item } from "../models";
import { positiveNumbersOnly } from "./positive-numbers-only.validators";
import { dybCategories } from "../models/categories.const";
import { NewItemFormOutput } from './new-item-form-output.model';

@Component({
  selector: 'dyb-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent implements OnInit {

  public newItemForm: FormGroup;

  public categoryList: any[] = dybCategories;
  
  public fileList: (File|{name: string, originalValue: string})[] = [];

  @Input() existingData: Item|null;

  @Output() save: EventEmitter<NewItemFormOutput> = new EventEmitter();

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
    const newItem = this.newItemForm.value;
    newItem.images = this.fileList;
    this.save.emit(newItem);
  }

  public cancelForm(): void {
    this.cancel.emit();
  }

  public newFile(event: Event): void {
    console.log(event);
    const input = <HTMLInputElement> event.target;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i ++) {
        const file = input.files.item(i);
        this.fileList.push(file);
      }
      input.value = null;
    }
    console.log(this.fileList);
  }

  public removeFile(index: number): void {
    this.fileList.splice(index, 1);
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

      ]],
      "categories": this.fb.group({
        "giftCertificates": [false, [

        ]],
        "jewelry": [false, [

        ]],
        "experiences": [false, [

        ]],
        "dining": [false, [

        ]],
        "sports": [false, [

        ]],
        "homeAndOffice": [false, [

        ]]
      })
    });
    if (this.existingData !== undefined && this.existingData !== null) {
      const imagesPatch = this.getExistingImages(this.existingData.images);
      this.newItemForm.patchValue(this.existingData);
      this.fileList = imagesPatch;
    }

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

  private getExistingImages(images: string[]): {name: string, originalValue: string}[] {
    const imagesPatch = [];
    images.forEach((elem) => {
      const badName = elem.split("/images%2F").pop();
      imagesPatch.push({
        name: badName.split("?")[0],
        originalValue: elem
      });
    });
    return imagesPatch;
  }
}
