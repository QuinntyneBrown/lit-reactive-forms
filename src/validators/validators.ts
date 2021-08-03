import { AbstractControl } from "src/models/abstract-control";
import { ValidationErrors } from "./validtor-fn";

function isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
}

function requiredValidator(control: AbstractControl) {
    return isEmptyInputValue(control.value) ? { 'required': true } : null;
}

export class Validators {
    static required(control: AbstractControl): ValidationErrors |null {
        return requiredValidator(control);
    }
}