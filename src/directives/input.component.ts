import { FormControl } from '../models/form-control';
import { FORM_CONTROL_CONNECTED } from '../core/constants';
import { Subject, takeUntil, tap } from 'rxjs';
import { BaseControlComponent, ControlValueAccessor } from './control-value-accessor';
import { AbstractControl } from 'src/models/abstract-control';

export class InputComponent extends BaseControlComponent(HTMLInputElement) implements ControlValueAccessor {
    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.addEventListener("keyup", () => {
            fn(this.value);
        });
    }

    registerOnTouched(fn: any): void {
        
    }

    setDisabledState?(isDisabled: boolean): void {

    }
    
    private readonly _destroyed$ = new Subject();

    public control: AbstractControl;

    connectedCallback() {
        super.connectedCallback();
        
        this.registerOnChange((value: any) =>  {
            this.control.patchValue(value,{
                emitEvent: true
            })
        });
        
        this.control.valueChanges
        .pipe(
            takeUntil(this._destroyed$),
            tap(x => (this.value = x))
        ).subscribe();

        this.control.statusChanges
        .pipe(
            takeUntil(this._destroyed$),
            tap(x => { 
                // set classes based on statuses...
            })
        ).subscribe();
    }

    disconnectedCallback() {
        this._destroyed$.next(null);
        this._destroyed$.complete();
    }
}

window.customElements.define('lit-input', InputComponent, { extends: 'input' });