import { AbstractControl } from "src/models/abstract-control";
import { ValidatorFn } from "./interfaces/validtor-fn";

export class Validators {
    static get required(): ValidatorFn {
        return function(control: AbstractControl) {
            return null
        }
    }
}