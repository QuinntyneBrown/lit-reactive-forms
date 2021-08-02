import { lastValueFrom } from "rxjs";
import { FORM_CONTROL_CONNECTED } from "../core/constants";
import { ValidatorFn } from "../validators/interfaces/validtor-fn";
import { AbstractControl } from "./abstract-control";

export class FormControl extends AbstractControl {

    
    _onChange: Function[] = [];
    
    registerOnChange(fn: Function): void {
      this._onChange.push(fn);
    }
    
    constructor(formState:any = null, validatorOrOpts?: ValidatorFn|ValidatorFn[]| null) {
        super();
        this._initObservables();
        this.setValue(formState);
        
    }

    setValue(value: any, options: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
      } = {
          emitEvent: true
      }): void {

        (this as {value: any}).value = value;

        if(options.emitEvent) {
            this.valueChanges.next(value);
        }
    }

    patchValue(value: any, options: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
      } = {}): void {
        this.setValue(value, options);
    }
    reset(value?: any, options?: Object): void {

    }
    _updateValue(): void {

    }
    _forEachChild(cb: Function): void {

    }
    _anyControls(condition: Function): boolean {
        return false;
    }
    _allControlsDisabled(): boolean {
        return false;
    }
    _syncPendingControls(): boolean {
        return false;
    }
}