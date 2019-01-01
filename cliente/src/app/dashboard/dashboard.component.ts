import { AppState } from './../app.reducer';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  user_subscription: Subscription = new Subscription();
  item_subscription: Subscription = new Subscription();
  constructor(
    private _ingresoEgresoService:IngresoEgresoService,
    private _store:Store<AppState>
  ) { }

  ngOnInit():void {
    this.user_subscription = this._store.select('auth')
    .pipe(
      filter(fil => fil.user != null),
      map(row => row.user)
    )
    .subscribe(user => {
      this._ingresoEgresoService.getIngresoEgresoByPersona(user.id_persona);
    });
  }

}
