export class IngresoEgreso {
    descripcion:string;
    monto:number;
    tipo:string;
    id?:string;
    constructor(obj:DataObj) {
        this.descripcion  = obj && obj.descripcion  || null;
        this.monto        = obj && obj.monto       || null;
        this.tipo         = obj && obj.tipo        || null;
        this.id           = obj && obj.id         || null;
    }
}

interface DataObj {
    descripcion:string;
    monto:number;
    tipo:string;
    id?:string;
}