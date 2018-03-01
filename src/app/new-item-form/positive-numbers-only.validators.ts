import { AbstractControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export function positiveNumbersOnly(control: AbstractControl) {
    const value = parseInt(control.value, 10);
    if (value !== null && value < 0) {
        return {"positiveNumbersOnly": true};
    }
    else {
        return null;
    }
}
