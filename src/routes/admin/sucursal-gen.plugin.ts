import * as templatedModule from "../../core";
import { Sucursal} from "../../models/sucursal.entity";

export default templatedModule.server(
    templatedModule.CRUD.initialize(Sucursal, {        
        beforeUpdate(user) {
            
        }
    })
);