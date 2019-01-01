import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';

// Models
import { User } from './../../auth/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  user:User = new User();
  user_subscription = new Subscription();
  constructor(
    private _store : Store<AppState>
  ) { }

  ngOnInit():void {
    this.user_subscription = this._store.select('auth')
    .pipe(filter(fil => fil.user != null))
    .subscribe(auth => {
      this.user = auth.user;
    });
  }

  ngOnDestroy():void {
    this.user_subscription.unsubscribe();
  }

}
