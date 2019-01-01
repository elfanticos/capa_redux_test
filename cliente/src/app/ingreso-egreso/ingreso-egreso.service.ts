import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

// Models
import { IngresoEgreso } from './ingreso-egreso.model';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromUI from '../shared/ui.action';
import * as fromIngresoEgreso from './ingreso-egreso.action';

// Service
import { AuthService } from '../auth/auth.service';

// Dependencias
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  url:string;
  private items :IngresoEgreso[] = [];
  constructor(
    public _httpClient: HttpClient,
    private _router:Router,
    private _store : Store<AppState>,
    public _authService: AuthService
  ) {
    this.url = 'http://localhost:3000/ingreso_egreso/';
  }

  insertIngresoEgreso(item:IngresoEgreso, items:IngresoEgreso[]) {
    // Obtener el objeto de usuario de sesión
    const user  = this._authService.userSession;
    
    // Cabecera htttp
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    // Parametros para petición http
    let obj = {
      token : localStorage.getItem('token'),
      item  : {...item, _id_persona : user.id_persona} 
    }
    // Activar carga
    this._store.dispatch(new fromUI.ActivarLoadingAction());

    // Petición http
    this._httpClient.post(this.url+'insertIngresoEgreso',obj, { headers: headers }).subscribe((res:any) => {

    //Actualizar parametro de registro
    item = res.data;

    // Desactivar carga
    this._store.dispatch(new fromUI.DesactivarLoadingAction());

    // Construir nuevo registros de ingreso y egreso
    this._store.dispatch(new fromIngresoEgreso.SetItemsAction([item, ...items]));

    // Redireccionar al detalle para visualizar el registro ingresado
    this._router.navigate(['/detalle']);
    },err => {
      // Mensaje de error
      Swal('Error al insertar', err.error ? err.error.msj : 'No se encontro la página', 'error');

      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());
    });
  }

  getIngresoEgresoByPersona(id_persona:any):void {
    // Parametros http
    let params = new HttpParams()
        .set('token' , localStorage.getItem('token'))
        .set('id_persona' , id_persona);
    
    // Petición http
    this._httpClient.get(this.url+'getIngresoEgresos', {params : params}).subscribe((res:any) => {

      // Validar si existe movimientos
      if (res && res.length > 0) {
        // Castear a decimales
        res.map(row => row.monto = parseFloat(row.monto));
      }

      //Setear el array de movimientos
      this._store.dispatch(new fromIngresoEgreso.SetItemsAction(res));
    },err => {
      //Setear en null el array de movimientos
      this._store.dispatch(new fromIngresoEgreso.UnSetItemsAction());

      // Mensaje de error
      Swal('Error al cargar dashboard', err.error ? err.error.msj : 'No se encontro la página', 'error');
    });
  }

  deleteIngresoEgreso(item:IngresoEgreso, items:IngresoEgreso[]) {
    // Cabecera http
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Parametros de petición http
    let obj = {
      token : localStorage.getItem('token'),
      id    : item.id
    }
    
    // Activar carga
    this._store.dispatch(new fromUI.ActivarLoadingAction());

    // Petición http
    this._httpClient.post(this.url+'deleteIngresoEgreso',obj, { headers: headers }).subscribe((res:any) => {
      // Mensaje de acción
      Swal('Eliminar', res.msj, 'success');

      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());

      // Construir nuevo registros de ingreso y egreso
      this._store.dispatch(new fromIngresoEgreso.SetItemsAction(items.filter(fil => fil.id != item.id)));
    },err => {
      // Mensaje de error
      Swal('Error al eliminar', err.error ? err.error.msj : 'No se encontro la página', 'error');

      // Desactivar carga
      this._store.dispatch(new fromUI.DesactivarLoadingAction());
    });
  }
}
