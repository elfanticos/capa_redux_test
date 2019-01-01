import {Action} from '@ngrx/store';

// Constantes de acciones
export const ACTIVAR_LOADING    = '[UI Loading] cargando';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de la carga';

// Clases de acciones
export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

// Tipos de acciones
export type acciones = 
ActivarLoadingAction |
DesactivarLoadingAction;