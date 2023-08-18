import { fromEvent, Subject, takeUntil, tap } from "rxjs";
import { HTMLElementContructor } from '../core/html-element-constructor';
import { ControlValueAccessor } from "./control-value-accessor";
import { AbstractControl } from '../../src/models/abstract-control';

export function BaseControlComponent<TBase extends HTMLElementContructor>(Base: TBase) {
    return class extends Base implements ControlValueAccessor {
  
      protected readonly _destroyed$ = new Subject();
      
      writeValue(obj: any): void { }
  
      registerOnChange(fn: any): void { }
  
      registerOnTouched(fn: any): void {
          this.querySelectorAll("*")
          .forEach((element: HTMLElement) => {
          fromEvent(element, "focus")
            .pipe(
              takeUntil(this._destroyed$),
              tap((x: unknown) => fn())
            )
            .subscribe();
        });
      }
  
      setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.formControl.disable() : this.formControl.enable();
      }
  
      private _formControl: AbstractControl;
  
      public get formControl() {
        return this._formControl;
      }
  
      public set formControl(value: AbstractControl) {
        this._formControl = value;
      }
  
      connectedCallback() {    
        this._setInitialValue();
  
        this.registerOnChange((value: any) =>  {
          this.formControl.patchValue(value, {
            emitEvent: true
          })
        });

        this.formControl.valueChanges
        .pipe(
            takeUntil(this._destroyed$),
            tap((x: unknown) => this.writeValue(x))
        ).subscribe();        
  
        this.formControl.statusChanges
        .pipe(
          takeUntil(this._destroyed$),
          tap((x: unknown) => { 
                // set classes based on statuses...
            })
        ).subscribe();
      }
  
      disconnectedCallback() {
        this._destroyed$.next(null);
        this._destroyed$.complete();
      }
  
      private _setInitialValue() {      
        this.writeValue(this._formControl.value);
      }
    }
  }