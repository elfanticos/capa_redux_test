import { Component, OnInit, OnDestroy } from '@angular/core';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';

// Services
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando:boolean;
  subscription : Subscription = new Subscription();
  constructor(
    private _authService : AuthService,
    private _store:Store<AppState>
  ) { }

  ngOnInit():void {
    this.subscription = this._store.select('ui').subscribe(ui=> this.cargando = ui.isLoading);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  login(value:any):void {
    this._authService.login(value);
  }

}
