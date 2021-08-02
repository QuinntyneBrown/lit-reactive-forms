import { AbstractControl } from "./abstract-control";

export class FormGroup extends AbstractControl {
    
    setValue(value: any, options?: Object): void {
        throw new Error("Method not implemented.");
    }
    patchValue(value: any, options?: Object): void {
        throw new Error("Method not implemented.");
    }
    reset(value?: any, options?: Object): void {
        throw new Error("Method not implemented.");
    }
    _updateValue(): void {
        throw new Error("Method not implemented.");
    }
    _forEachChild(cb: Function): void {
        throw new Error("Method not implemented.");
    }
    _anyControls(condition: Function): boolean {
        throw new Error("Method not implemented.");
    }
    _allControlsDisabled(): boolean {
        throw new Error("Method not implemented.");
    }
    _syncPendingControls(): boolean {
        throw new Error("Method not implemented.");
    }
    
}