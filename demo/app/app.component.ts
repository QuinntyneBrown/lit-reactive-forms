import { render, html } from "lit";
import { FormControl } from "../../src/models/form-control";
import { async } from '../../src/core/async.directive';
import { Validators } from '../../src/validators/validators';

import "./app.component.scss";

class AppComponent extends HTMLElement {

    searchControl = new FormControl('search', [Validators.required]);

    nameControl = new FormControl('name', [Validators.required]);

    connectedCallback() {            
        render(html`       
            <div>
                <label>Search</label>                     
                <input is="lit-input" .formControl=${this.searchControl}>       
            </div>

            <div>
                <label>Name</label>                     
                <input is="lit-input" .formControl=${this.nameControl}> 
            </div>
        
            <button @click=${this.handleClick}>Save</button>

            <!-- Show output -->
            <p>${async(this.searchControl.valueChanges)}</p>

            <p>${async(this.nameControl.valueChanges)}</p>        
            
        `, this);
    }

    handleClick = () => alert(this.searchControl.value);
}

window.customElements.define('lit-app', AppComponent);
