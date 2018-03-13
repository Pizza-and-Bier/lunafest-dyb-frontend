import { AbstractControl, ValidatorFn } from '@angular/forms';

export default function makeValidator(isValid: () => boolean, controlName: string): ValidatorFn {
    return (control: AbstractControl) => {
        if (!isValid()) {
            return { [controlName]: { value: control.value }};
        }
        return null;
    };
}
