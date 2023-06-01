import { Cliente } from "./Cliente";

export class Tarea {
    idTarea: number;
    titulo: string;
    cliente: Cliente;
    fechaLimite:string;
    resumen:boolean;
    estado:boolean;
}
