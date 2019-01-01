import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingr_egre_subscription: Subscription = new Subscription();
  ingresos:number;
  egresos:number;
  cuantosEgresos:number;
  cuantosIngresos:number;
  constructor(
    private _store:Store<AppState>
  ) { }

  ngOnInit():void {
    // Registros de ingreso y egreso
    this.ingr_egre_subscription = this._store.select('ingresoEgreso').subscribe(row => {
      this.contarIngresoEgreso(row.items);
    });
  }

  ngOnDestroy():void {
    this.ingr_egre_subscription.unsubscribe();
  }

  contarIngresoEgreso(items:IngresoEgreso[]) {
    // Inicializar los valores
    this.ingresos        = 0;
    this.egresos         = 0;
    this.cuantosEgresos  = 0;
    this.cuantosIngresos = 0;

    // Calcular cuantos ingresos y egresos tenemos y subar dichos montos por tipo
    items.forEach(item => {
      if (item.tipo == 'INGRESO') {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });
    // this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
