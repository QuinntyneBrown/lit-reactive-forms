import { render } from "lit-html";
import { BehaviorSubject, combineLatest, map, of, shareReplay, Subject, takeUntil, tap } from "rxjs";
import { StyleInfo } from 'lit-html/directives/style-map.js';
import { html, unsafeStatic } from "lit-html/static.js";

import "./App.component.scss";
import { FormControl } from "../../src/models/form-control";
import { getVariableName } from "../../src/core";
import { push } from './push.directive';

class AppComponent extends HTMLElement {
    connectedCallback() {    
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        const searchControl = FormControl.create(this, "searchControl");

        const nameControl = FormControl.create(this, "nameControl");

        render(html`
        
        <h2>Search</h2>         
        <input is="lit-input" [formControl]="searchControl">       
        <h1>${push(searchControl.valueChanges)}</h1>
        
        <h2>Other</h2>         
        <input is="lit-input" [formControl]="nameControl">     



        <h1>${push(nameControl.valueChanges)}</h1>
        
        `, this.shadowRoot) 
    }
}

window.customElements.define('lit-app', AppComponent);
