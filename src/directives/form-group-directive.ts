import { nothing } from "lit";
import { Directive, directive, PartInfo } from "lit/directive.js";

export class FormGroupDirective extends Directive {

    constructor(_partInfo: PartInfo) {
        super(_partInfo);
    }

    render(...props: unknown[]): unknown {
        return nothing;        
    }

}

export const formGroupDirective = directive(FormGroupDirective);