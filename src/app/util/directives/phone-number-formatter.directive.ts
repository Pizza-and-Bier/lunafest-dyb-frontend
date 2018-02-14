import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { AsYouType, parse } from 'libphonenumber-js';

@Directive({
  selector: '[dybPhoneNumber]',
})
export class PhoneNumberFormatter implements OnChanges {
  
  private currentValue: string = "";

  private typeAhead: AsYouType;
  
  @Input() existingNumber: string;

  @Input() clearInput: boolean;

  @Output() onPhoneNumberChanged = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) { 
    this.typeAhead = new AsYouType("US");
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if (this.existingNumber !== undefined) {
      this.unFormatNumber(this.existingNumber);
      this.typeAhead.input(this.existingNumber);
      this.currentValue = this.unFormatNumber(this.existingNumber);

    }

    if (this.clearInput !== undefined && this.clearInput) {
      this.typeAhead.reset();
    }
  }

  @HostListener('keydown', ['$event']) 
  public onKeyDown(event: any) {

    if ( // Allow: Ctrl+A
      (event.keyCode == 65 && (event.ctrlKey === true || event.metaKey === true)) ||
      // Allow: Ctrl+C
      (event.keyCode == 67 && (event.ctrlKey === true || event.metaKey === true)) ||
      // Allow: Ctrl+X
      (event.keyCode == 88 && (event.ctrlKey === true || event.metaKey === true)) ||
      // Allow: Ctrl+V
      (event.keyCode == 86 && (event.ctrlKey === true || event.metaKey === true)) ||
      // Allow: home, end, left, right
      (([37, 39, 36, 35]).indexOf(event.keyCode) !== -1) && 
        (event.ctrlKey === true || event.metaKey === true)) {
        // let it happen, don't do anything
        return;
    }

    // Handle tab.
    if (event.keyCode !== 9) {
      event.preventDefault();
      // Handle backspace.
      if (event.keyCode == 8) {
        this.typeAhead.reset();
        this.currentValue = this.currentValue.slice(0, this.currentValue.length -1);
        this.onPhoneNumberChanged.emit(this.typeAhead.input(this.currentValue));
      }
      // Catch numbers and numpad numbers.
      else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        let input = this.typeAhead.input(event.key);      
        this.currentValue += event.key;
        this.onPhoneNumberChanged.emit(input);
      }
    }
  }
  
  @HostListener("paste", ["$event"])
  public onPaste(event: any) {
    event.preventDefault();
    this.typeAhead.reset();
    this.onPhoneNumberChanged.emit(this.typeAhead.input(event.clipboardData.getData("Text")));

  }

  private unFormatNumber(formattedNumber: string) {
    return formattedNumber.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
  }
}