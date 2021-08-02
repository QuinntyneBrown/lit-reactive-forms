import { render } from "lit-html";
import { BehaviorSubject, combineLatest, map, of, Subject, takeUntil, tap } from "rxjs";
import { StyleInfo } from 'lit-html/directives/style-map.js';
import { html, unsafeStatic } from "lit-html/static.js";

import "./App.component.scss";
import { FormControl } from "../../src/models/form-control";
import { FORM_CONTROL_CONNECTED } from "../../src/core/constants";


class AppComponent extends HTMLElement {
    private readonly _destroyed$: Subject<void> = new Subject();

    private readonly _attributes$: BehaviorSubject<{

    }> = new BehaviorSubject({ });

    constructor() {
        super();
    }

    private readonly _vm$ = combineLatest([this._attributes$]);
    
    static get observedAttributes(): any[] {
        return [

        ];
    }

    connectedCallback() {    
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        var control = new FormControl(1);

        this.addEventListener(FORM_CONTROL_CONNECTED, event$ => {
            event$.stopPropagation();
            Object.assign((event$ as CustomEvent).detail, { control });
        });
        
        this._vm$
        .pipe(
            takeUntil(this._destroyed$),
            map(vm => html`
               <input is="lit-input">
            `),
            tap(template => render(template, this.shadowRoot)),            
        ).subscribe();   
    }
    
    attributeChangedCallback (name:string, _:any, newValue:string) {

    }

    disconnectedCallback() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}

window.customElements.define('lit-app', AppComponent);
