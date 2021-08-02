import { nothing } from "lit";
import { Directive, directive, PartInfo } from "lit/directive.js";

export class FormControlName extends Directive {

    constructor(_partInfo: PartInfo) {
        super(_partInfo);
    }

    render(...props: unknown[]): unknown {
        return nothing;        
    }

}

export const formControlName = directive(FormControlName);