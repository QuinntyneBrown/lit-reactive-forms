import { render, html } from "lit";
import { FormControl } from "../../src/models/form-control";
import push from '../../src/core/push.directive';
import { Validators } from '../../src/validators/validators';

import "./app.component.scss";


class AppComponent extends HTMLElement {
    connectedCallback() { 
        const searchControl = new FormControl('search', [Validators.required]);
        const nameControl = new FormControl('name', [Validators.required]);

        render(html`       
            <div>
                <label>Search</label>                     
                <input is="lit-input" .formControl=${searchControl}>       
            </div>

            <div>
                <label>Name</label>                     
                <input is="lit-input" .formControl=${nameControl}> 
            </div>
        
            <button @click=${() => alert(searchControl.value)}>Save</button>

            <!-- Show output -->
            <p>${push(searchControl.valueChanges)}</p>

            <p>${push(nameControl.valueChanges)}</p>        
            
        `, this);
    }
}

window.customElements.define('lit-app', AppComponent);
