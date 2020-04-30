import * as templatedModule from "../../core";
import { Usuario } from "../../models/usuario.entity";

export default templatedModule.server(
    templatedModule.CRUD.initialize(Usuario, {        
        beforeUpdate(user) {
 
        }
    })
);