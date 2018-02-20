import { ValidatorFn, AbstractControl } from '@angular/forms';

import { BaseAuthService } from '../base-services';

export class UsernameAvaialableValidator {
    static createValidator(authService: BaseAuthService) {
        return (control: AbstractControl) => {
            return authService.userExists(control.value).then( (exists) => {
                if (exists) {
                    return null;
                }
                else {
                    return {usernameUnavailable: true};
                }
            });
        };
    }
}