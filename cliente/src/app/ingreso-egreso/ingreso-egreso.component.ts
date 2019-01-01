import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { IngresoEgreso } from './ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {
  form:FormGroup;
  subscription:Subscription = new Subscription();
  ingr_egre_subscription: Subscription = new Subscription();
  cargando:boolean;
  items:IngresoEgreso[] = [];
  constructor(
    private _store:Store<AppState>,
    private _ingresoEgresoService:IngresoEgresoService
  ) {
    // Inicializar formulario
    this.form = new FormGroup({
      descripcion : new FormControl(null),
      monto : new FormControl(null),
      tipo : new FormControl('INGRESO')
    });
  }

  ngOnInit():void {
    this.subscription = this._store.select('ui').subscribe(row => {
      this.cargando = row.isLoading;
    });
    // Registros de ingreso y egreso
    this.ingr_egre_subscription = this._store.select('ingresoEgreso').subscribe(row => {
      this.items = row.items;
    });
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
    this.ingr_egre_subscription.unsubscribe();
  }

  getChange(tipo:string):void {
    this.form.controls['tipo'].setValue(tipo);
  }

  registrarIngresoEgreso():void {
    this._ingresoEgresoService.insertIngresoEgreso(this.form.value, this.items);
  }

}
