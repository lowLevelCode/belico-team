import { TipoUsuarioResult } from "./TipoUsuarioResult";


export class UserResult {
    id:number;    
    nombre:string;    
    createAt :Date;    
    opcActivo :number;
    tipousuario:TipoUsuarioResult; 
    token?:string;
}