import { AbstractControl } from "../models/abstract-control";

export type ValidationErrors = {
    [key: string]: any
};

export interface ValidatorFn {
    (control: AbstractControl): ValidationErrors|null;
}