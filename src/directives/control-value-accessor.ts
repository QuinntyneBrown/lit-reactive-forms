import { nothing } from "lit";
import { Directive, directive, PartInfo } from "lit/directive.js";
import { Constructor } from '../core/constructor';

 export interface ControlValueAccessor {
   writeValue(obj: any): void;
 
   registerOnChange(fn: any): void;
   
   registerOnTouched(fn: any): void;
 
   setDisabledState?(isDisabled: boolean): void;
 }

 
export function BaseControlValueAccessor<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    onChange = (_: any) => {};
 
    onTouched = () => {};
 
 
    protected setProperty(key: string, value: any): void {
      
    }
  
    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
 
    registerOnChange(fn: (_: any) => {}): void {
      this.onChange = fn;
    }
 
    setDisabledState(isDisabled: boolean): void {
      this.setProperty('disabled', isDisabled);
    }
  }
}



 
 
