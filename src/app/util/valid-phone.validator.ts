import { ValidatorFn, AbstractControl } from '@angular/forms';

import { parse, format, isValidNumber } from 'libphonenumber-js'

/** A hero's name can't match the given regular expression */
export function validPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): {[key:string]: any} => {
        let parsedNumber = parse(control.value, "US");
        let validNumber = (Object.keys(parsedNumber).length !== 0 && parsedNumber.constructor === Object);
        return validNumber ? null : {"validPhoneNumber": "oops"};
    };
}