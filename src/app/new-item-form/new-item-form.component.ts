import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Item } from "../models";

@Component({
  selector: 'dyb-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css']
})
export class NewItemFormComponent implements OnInit {

  public newItemForm: FormGroup;

  @Input() existingData: Item|null;

  @Output() save: EventEmitter<Item> = new EventEmitter();

  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.newItemForm = this.fb.group({
      "name": ["", [
        Validators.required
      ]],
      "description": ["", [

      ]],
      "estimatedWorth": [1, [
        
      ]],
      "openingBid": [1, [
        Validators.required
      ]],
      "bidFloor": [1, [
        Validators.required
      ]]
    });
  }

}
