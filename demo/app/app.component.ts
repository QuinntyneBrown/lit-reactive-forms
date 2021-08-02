import { render, html } from "lit";
import { FormControl } from "../../src/models/form-control";
import { async } from '../../src/core/async.directive';
import { Validators } from '../../src/validators/validators';

import "./App.component.scss";

class AppComponent extends HTMLElement {

    searchControl = new FormControl('search', [Validators.required]);

    nameControl = new FormControl('name', []);;

    connectedCallback() {    
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        render(html`
        
        <h2>Search</h2>         
        
        <input is="lit-input" .formControl=${this.searchControl}>       
        
        <h1>${async(this.searchControl.valueChanges)}</h1>

        <h2>Name</h2>         
        
        <input is="lit-input" .formControl=${this.nameControl}>       
        
        <h1>${async(this.nameControl.valueChanges)}</h1>        

        <button @click=${this.handleClick}>Save</button>
        
        `, this.shadowRoot) 
    }

    handleClick = () => {
        alert(this.searchControl.value);
    }
}

window.customElements.define('lit-app', AppComponent);
