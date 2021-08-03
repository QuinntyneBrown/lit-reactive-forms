import { takeUntil, tap } from 'rxjs';
import { ControlValueAccessor, BaseControlComponent } from '.';

export class InputComponent extends BaseControlComponent(HTMLInputElement) implements ControlValueAccessor {
    override writeValue(obj: any): void {
        this.value = obj;
    }

    override registerOnChange(fn: any): void {
        this.addEventListener("keyup", () => {
            fn(this.value);
        });
    }

    override connectedCallback() {
        super.connectedCallback();
                
        this.formControl.valueChanges
        .pipe(
            takeUntil(this._destroyed$),
            tap(x => (this.value = x))
        ).subscribe();
    }
}

window.customElements.define('lit-input', InputComponent, { extends: 'input' });