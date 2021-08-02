import { nothing } from "lit";
import { Directive, directive, PartInfo } from "lit/directive.js";
import { AbstractControl } from "src/models/abstract-control";
import { FormControl } from "src/models/form-control";
import { FORM_CONTROL_CONNECTED } from "../core/constants";
import { Constructor } from '../core/constructor';
import { FormControlName } from "./form-control-name";

 export interface ControlValueAccessor {
   writeValue(obj: any): void;
 
   registerOnChange(fn: any): void;
   
   registerOnTouched(fn: any): void;
 
   setDisabledState?(isDisabled: boolean): void;

   control: AbstractControl;
 }

export function BaseControlComponent<TBase extends Constructor>(Base: TBase) {
  return class extends Base {

    connectedCallback() {

      var formControl = (this as any).getAttribute("[formControl]");

      var customEvent = new CustomEvent(FORM_CONTROL_CONNECTED, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: { 
          formControl
        }            
      });
      
      (this as any).dispatchEvent(customEvent);
      
      this._setControlAndInitialValue((customEvent.detail as any).control);
      
      (this as unknown as ControlValueAccessor).writeValue((this as unknown as ControlValueAccessor).control.value);
      
    }

    private _setControlAndInitialValue(control: AbstractControl) {

      (this as unknown as { control: AbstractControl }).control = control;

      (this as any).value = (this as unknown as ControlValueAccessor).control.value;
    }
  }
}



 
 
