export class User {
    public id_persona    : number;
    public nom_persona   : string;
    public ape_pate_pers : string;
    public ape_mate_pers : string;
    public nro_documento : string;
    public foto_persona  : string;
    
    constructor(obj?:DataObj) {
        this.id_persona    = obj && obj.id_persona    || null;
        this.nom_persona   = obj && obj.nom_persona   || null;
        this.ape_pate_pers = obj && obj.ape_pate_pers || null;
        this.ape_mate_pers = obj && obj.ape_mate_pers || null;
        this.nro_documento = obj && obj.nro_documento || null;
        this.foto_persona  = obj && obj.foto_persona  || null;
    }
}

interface DataObj {
    id_persona    : number;
    nom_persona   : string;
    ape_pate_pers : string;
    ape_mate_pers : string;
    nro_documento : string;
    foto_persona  : string;
}