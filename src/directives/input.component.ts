import { FormControl } from '../models/form-control';
import { FORM_CONTROL_CONNECTED } from '../core/constants';
import { Subject, takeUntil, tap } from 'rxjs';

export class InputComponent extends HTMLInputElement {
    
    private readonly _destroyed$ = new Subject();

    public control!: FormControl;

    connectedCallback() {
        var customEvent = new CustomEvent(FORM_CONTROL_CONNECTED, {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: { }            
        });

        this.dispatchEvent(customEvent);

        this.control = (customEvent.detail as any).control;

        this.value = this.control.value;

        this.control.valueChanges
        .pipe(
            takeUntil(this._destroyed$),
            tap(x => alert("?")),
            tap(x => (this.value = x))
        ).subscribe();

        this.control.statusChanges
        .pipe(
            takeUntil(this._destroyed$),
            tap(x => { 
                // set classes based on statuses...
            })
        ).subscribe();


        this.addEventListener("keyup", value => {
            this.control.patchValue(value, { emitEvent: false });
            //this.control.validate()?
        });
    }

    disconnectedCallback() {
        this._destroyed$.next(null);
        this._destroyed$.complete();
    }
}

window.customElements.define('lit-input', InputComponent, { extends: 'input' });