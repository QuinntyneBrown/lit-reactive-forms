import { BehaviorSubject, Observable } from "rxjs";
import { ValidationErrors } from "../validators/validtor-fn";
import { DISABLED, INVALID, PENDING, VALID } from "./constants";
import { FormGroup } from "./form-group";

export abstract class AbstractControl {
    public readonly value: any;
    
    private _parent: FormGroup|null;

    public readonly status!: string;

    get parent(): FormGroup|null {
        return this._parent;
    }

    get valid(): boolean {
        return this.status === VALID;
    }

    get invalid(): boolean {
        return this.status === INVALID;
    }

    get pending(): boolean {
        return this.status == PENDING;
    }

    get disabled(): boolean {
        return this.status == DISABLED;
    }   
    
    get enabled(): boolean {
        return this.status !== DISABLED;
    }    

    public readonly errors!: ValidationErrors|null; 
    
    public readonly pristine: boolean = true;

    get dirty(): boolean {
        return !this.pristine;
    }    

    public readonly touched: boolean = false;

    get untouched(): boolean {
        return !this.touched;
    }    

    public readonly valueChanges: BehaviorSubject<any>;    

    public readonly statusChanges: BehaviorSubject<any>;    

    setParent(parent: FormGroup): void {
        this._parent = parent;
    } 

    private _calculateStatus(): string {

        //152 - 
        // if (this._allControlsDisabled()) return DISABLED;
        // if (this.errors) return INVALID;
        // if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
        // if (this._anyControlsHaveStatus(INVALID)) return INVALID;
        return VALID;
    }    

    abstract setValue(value: any, options?: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
      }): void;

    abstract patchValue(value: any, options?: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
      }): void;

    abstract reset(value?: any, options?: Object): void;

    _initObservables() {
        (this as {valueChanges: Observable<any>}).valueChanges = new BehaviorSubject(null);
        (this as {statusChanges: Observable<any>}).statusChanges = new BehaviorSubject(null);
    }

    abstract _updateValue(): void;
  

    abstract _forEachChild(cb: Function): void;
  

    abstract _anyControls(condition: Function): boolean;
  

    abstract _allControlsDisabled(): boolean;
  

    abstract _syncPendingControls(): boolean;    
}