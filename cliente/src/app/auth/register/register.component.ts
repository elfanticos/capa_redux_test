import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';

// Services
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  cargando:boolean;
  subscription : Subscription = new Subscription();
  constructor(
    private _authService : AuthService,
    private _store : Store<AppState>
  ) { }

  ngOnInit():void {
    this.subscription = this._store.select('ui').subscribe(ui=> this.cargando = ui.isLoading);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  onSubmit(data:any, objForm:any) {
    this._authService.crearUsuario(data);
  }

}
