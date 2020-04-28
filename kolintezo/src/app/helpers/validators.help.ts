import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {UserPasswordComponent} from '../modules/shared/components/user-password/user-password.component';

export function regexpValidator(nameRe: RegExp, name: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const passed = nameRe.test(control.value);
        const obj = {};
        obj[name] = {value: control.value};
        return !passed ? obj : null;
    };
}

export function equalsValidator(other: UserPasswordComponent, name: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const passed = other && other.value && other.value === control.value;
        const obj = {};
        obj[name] = {value: control.value};
        return !passed ? obj : null;
    };
}
