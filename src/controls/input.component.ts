import { BaseControlComponent } from '.';

export class InputComponent extends BaseControlComponent(HTMLInputElement) {
    override writeValue(obj: any): void {
        this.value = obj;
    }

    override registerOnChange(fn: any): void {
        this.addEventListener("keyup", () => {
            fn(this.value);
        });
    }
}

window.customElements.define('lit-input', InputComponent, { extends: 'input' });