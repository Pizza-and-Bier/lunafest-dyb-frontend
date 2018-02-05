import { AbstractControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export class PasswordMatchValidator {

    static matchPasswords(controlToMatch: string, otherControl: string) {
        return (control: AbstractControl) => {
            let password = control.get(controlToMatch).value;
            let confirm = control.get(otherControl).value;

            if (password !== confirm) {
                return control.get(otherControl).setErrors({"passwordsDontMatch": true});
            }
            else {
                return control.get(otherControl).setErrors(null);
            }
        }
    }
}