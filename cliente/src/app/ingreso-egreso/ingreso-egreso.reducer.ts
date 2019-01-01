import { IngresoEgreso } from './ingreso-egreso.model';
import * as fromIngresoEgreso from './ingreso-egreso.action';

// Interface de egresoIngreso
export interface IngresoEgresoState {
    items : IngresoEgreso[]
}

//Valor inicial del estado
const estadoInicial:IngresoEgresoState = {
    items : []
};

// Función reducer
export function ingresoEgresoReducer(state = estadoInicial, action:fromIngresoEgreso.acciones):IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items : [
                    ...action.items.map(item => {
                        return {
                            ...item
                        };
                    })
                ]
            }
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items : []
            }
        default:
            return state;
    }
}