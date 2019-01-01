import * as fromAuth from './auth.action';

// Models
import { User } from './user.model';

// Interface de AUTH
export interface AuthState {
    user : User
}

// Valor inicial
const estadoInicial : AuthState = {
    user : null
}

// Función reducer
export function authReducer(state = estadoInicial , action : fromAuth.acciones):AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user : {...action.user}
            }
        case fromAuth.UNSET_USER:
            return {
                user : null
            }
        default:
            return state;
    }
}