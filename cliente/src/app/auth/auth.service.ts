import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

// Dependencias de terceros
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';

// Reducers
import { AppState } from './../app.reducer';

//Actions
import * as fromUI from '../shared/ui.action';
import * as fromAuth from './auth.action';
import * as fromIngresoEgreso from '../ingreso-egreso/ingreso-egreso.action';

// Models
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string;
  private user:User = null;
  constructor(
    public _httpClient: HttpClient,
    private _router:Router,
    private _store:Store<AppState>
  ) { 
    this.url = 'http://localhost:3000/auth/';
  }

  get userSession() {
    return this.user;
  }

  crearUsuario(data:any):void {
    // Parametros
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

     // Activar carga
     this._store.dispatch(new fromUI.ActivarLoadingAction());
    
    // Petición http 
    this._httpClient.post(this.url+'crearUsuario',data, { headers: headers }).subscribe((res:any) => {
      
      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());

      // Cargando la información del usuario
      this._store.dispatch(new fromAuth.SetUserAction(res.user));
      this.user = res.user;
      localStorage.setItem('token', res.token);

      // Redireccionar al home
      this._router.navigate(['/']);
    },err => {
      // Mensaje de error
      Swal('Error al crear usuario', err.error ? err.error.msj : 'No se encontro la página', 'error');
      
      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());
      
      // Vaciar la información del usuario
      this._store.dispatch(new fromAuth.UnSetUserAction());
    });
  }

  login(data:any):void {
    // Parametros
    let params = new HttpParams()
        .set('usuario' , data.usuario)
        .set('clave'   , data.clave);

    // Activar carga
    this._store.dispatch(new fromUI.ActivarLoadingAction());
    
    // Petición http
    this._httpClient.get(`${this.url}login`, {params : params}).subscribe((res:any) => {

      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());

      // Guardar token en local
      localStorage.setItem('token', res.token);

      // Cargando la información del usuario
      this._store.dispatch(new fromAuth.SetUserAction(res.user));
      this.user = res.user;

      // Redireccionar al home
      this._router.navigate(['/']);
    },err => {
      // Setear usuario
       this._store.dispatch(new fromAuth.UnSetUserAction());

      // Mostrar mensaje de error
      Swal('Error al ingresar', err.error ? err.error.msj : 'No se encontro la página', 'error');
      
      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());
    });
  }

  logout():void {
    // Limpiar datos de cache y localstorage
    localStorage.clear();

    // Setear usuario de sesión
    this._store.dispatch(new fromAuth.UnSetUserAction());

    // Setear movimientos por persona
    this._store.dispatch(new fromIngresoEgreso.UnSetItemsAction())

    // Redireccionar al login
    this._router.navigate(['/login']);
  }

  validatorToken():void {
    // Validar si el token existe
    if (!localStorage.getItem('token')) {
      this._router.navigate(['/login']);
      return;
    }

    // Parametros
    let params = new HttpParams()
        .set('token' , localStorage.getItem('token'));

    // Activar carga
    this._store.dispatch(new fromUI.ActivarLoadingAction());
    
    // Petición http
    this._httpClient.get(`${this.url}validatorToken`, {params : params}).subscribe((result:any) => {

      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());

      //Setear datos de usuario sesión
      this._store.dispatch(new fromAuth.SetUserAction(result.user));
      this.user = result.user;

      // Guardar token en local
      localStorage.setItem('token', result.token);
    },err => {
      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());
    });
}
}
