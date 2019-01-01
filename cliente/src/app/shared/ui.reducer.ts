import * as fromUI from './ui.action';

// Interface de UI
export interface State {
    isLoading : boolean;
}

// Valor inicial del state
const initState : State = {
    isLoading : false
}

// Función reducer UI
export function uiReducer(state = initState, action : fromUI.acciones):State {
    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading : true
            }
        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading : false
            }
        default:
            return state;
    }
}