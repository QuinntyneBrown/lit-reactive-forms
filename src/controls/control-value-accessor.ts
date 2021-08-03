import { AbstractControl } from "../../src/models/abstract-control";

 export interface ControlValueAccessor {

   writeValue(obj: any): void;
 
   registerOnChange(fn: any): void;
   
   registerOnTouched(fn: any): void;
 
   setDisabledState?(isDisabled: boolean): void;

   formControl: AbstractControl;
 }




 
 
