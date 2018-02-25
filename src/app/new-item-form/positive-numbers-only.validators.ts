import { AbstractControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export function positiveNumbersOnly(control: AbstractControl) {
    const value = parseFloat(control.value);
    console.log(value);
    if (value < 0) {
        return {"positiveNumbersOnly": true};
    }
    else {
        return null;
    }
}
