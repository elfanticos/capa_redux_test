import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingr_egre_subscription: Subscription = new Subscription();
  items:IngresoEgreso[] = [];
  constructor(
    private _store:Store<AppState>,
    public _ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit():void {
    // Registros de ingreso y egreso
    this.ingr_egre_subscription = this._store.select('ingresoEgreso').subscribe(row => {
      this.items = row.items;
    });
  }

  ngOnDestroy():void {
    this.ingr_egre_subscription.unsubscribe();
  }

  borrarItem( item:IngresoEgreso ):void {
    this._ingresoEgresoService.deleteIngresoEgreso(item, this.items);
  }

}
