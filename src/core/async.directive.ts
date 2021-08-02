import { ChildPart, noChange, nothing } from 'lit';
import { AsyncDirective, directive  } from 'lit/async-directive.js';
import { Observable, Subject, takeUntil, tap } from 'rxjs';


export class Push extends AsyncDirective {
    protected _destroyed$ = new Subject();

    render(obs$: Observable<string>): typeof nothing {
        return nothing;
    }

    override update(
        part: ChildPart, [obs$]: Parameters<this["render"]>
      ): any {
        obs$
        .pipe(
            takeUntil(this._destroyed$),
            tap(x => this.setValue(x))
        )
        .subscribe();

        return noChange;
      }

      override disconnected() {
        this._destroyed$.next(null);
        this._destroyed$.complete();
      }
}

export const async = directive(Push);