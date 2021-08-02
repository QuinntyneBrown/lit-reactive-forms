import { AbstractControl } from "src/models/abstract-control";
import { FORM_CONTROL_CONNECTED } from "../core/constants";
import { Constructor } from '../core/constructor';


 export interface ControlValueAccessor {

   writeValue(obj: any): void;
 
   registerOnChange(fn: any): void;
   
   registerOnTouched(fn: any): void;
 
   setDisabledState?(isDisabled: boolean): void;

   formControl: AbstractControl;
 }

export function BaseControlComponent<TBase extends Constructor>(Base: TBase) {
  return class extends Base {

    private _formControl: AbstractControl;

    public get formControl() {
      return this._formControl;
    }

    public set formControl(value: AbstractControl) {
      this._formControl = value;
    }

    connectedCallback() {
      
      this._setInitialValue();

    }

    private _setInitialValue() {      
      (this as unknown as ControlValueAccessor).writeValue(this._formControl.value);
    }
  }
}



 
 
