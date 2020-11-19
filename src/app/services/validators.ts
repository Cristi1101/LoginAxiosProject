import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CustomValidators {

    constructor() { }

    //custom validator pentru email
    user(control: FormControl) {
        if (control.value.length < 5 || control.value.length > 20) {
            return { invalid: true };
        }
        return null;
    }

    //custom validator pentru parola
    password(control: FormControl) {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let hasSymbol = /[!@#$%^&*]/.test(control.value);

        const valid = hasNumber && hasUpper && hasLower && hasSymbol && (control.value.length >= 8);
        if (!valid) {
            return { invalid: true };
        }
        return null;
    }

    //custom validator pentru reintroducerea parolei
    repassword(group: FormGroup) {
        let pass = group.get('password').value;
        let confirmPass = group.get('repassword').value;

        return pass === confirmPass ? null : { invalid: true }
    }
}
