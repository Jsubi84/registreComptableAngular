import { Subcategoria } from "./subcategoria";

export class Registre{
        id: number = 0;
        data: Date = new Date();
        importreg: number = 0;
        tipus: boolean = false;
        subcategoria = new Subcategoria();
        descripcio: string = "";
        constructor(){}
}

