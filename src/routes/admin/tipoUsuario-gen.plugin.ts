import * as templatedModule from "../../core";
import { TipoUsuario } from "../../models/tipoUsuario.entity";

export default templatedModule.server(
    templatedModule.CRUD.initialize(TipoUsuario, {        
        beforeUpdate(user) {
 
        }
    })
);