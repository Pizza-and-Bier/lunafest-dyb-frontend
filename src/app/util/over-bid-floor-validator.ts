import { AbstractControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export const overBidFloorValidator = (bidFloor: number) => {
    return (control: AbstractControl) => {
        const value = parseInt(control.value, 10);

        if (value < bidFloor) {
            return {"overBidFloor": false};
        }
        else {
            return null;
        }
    }
}