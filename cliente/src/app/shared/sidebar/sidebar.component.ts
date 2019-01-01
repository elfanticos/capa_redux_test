import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Models
import { User } from 'src/app/auth/user.model';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';

// Services
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  user_subscription:Subscription = new Subscription();
  user:User = new User();
  constructor(
    private _authService: AuthService,
    private _store:Store<AppState>
  ) { }

  ngOnInit() {
    this.user_subscription = this._store.select('auth')
    .pipe(filter(fil => fil.user != null))
    .subscribe(auth => {
      this.user = auth.user;
    });
  }

  ngOnDestroy():void {
    this.user_subscription.unsubscribe();
  }

  logout():void {
    this._authService.logout();
  }

}
