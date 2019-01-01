import {Action} from '@ngrx/store';

// Models
import {User} from './user.model';

// Constantes de acción
export const SET_USER   = '[Auth] Set user';
export const UNSET_USER = '[Auth] Unset user';

// Clases de las acciones
export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public user:User){}
}

export class UnSetUserAction implements Action {
    readonly type = UNSET_USER;
}

// Tipos de acciones
export type acciones = 
SetUserAction |
UnSetUserAction;