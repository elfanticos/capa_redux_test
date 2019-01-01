import {Action} from '@ngrx/store';

// Models
import {IngresoEgreso} from './ingreso-egreso.model';

// Constantes de acciones
export const SET_ITEMS        = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS      = '[Ingreso Egreso] Unset Items';
export const ITEMS_MOV        = '[Ingreso Egreso Effects] Items';
export const ITEMS_MOV_CHANGE = '[Ingreso Egreso Effects] Items change';

// Clases de acciones
export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;
    constructor(public items:IngresoEgreso[]) {}
}

export class UnSetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

// Tipos de acciones
export type acciones = 
SetItemsAction | 
UnSetItemsAction;