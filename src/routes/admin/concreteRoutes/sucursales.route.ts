import { HttpStatus } from "../../HttpStatus";
import { Sucursal } from "../../../models/sucursal.entity";
import { defaultConn } from "../../../core/db";

export default function (fastify, opts, done) {      
    
    // test get
    fastify.get('/all', async (request, reply) => {
        
        try {

            let sucursalRepo = await defaultConn.getRepository(Sucursal);       //obtenemos el repositorio correspondiente                        
            let sucursales = await sucursalRepo.find();                

            reply.status(HttpStatus.OK).send(sucursales);   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);  // error interno de servidor
        }
    });

    
    fastify.post('/add', async (request, reply) => {

        try {                        

            let sucursal:Sucursal = { ...request.body };            
            let sucursalRepo = await defaultConn.getRepository(Sucursal);       //obtenemos el repositorio correspondiente                        
            const sucursalSaved:Sucursal = await sucursalRepo.save(sucursal);    // guardamos la informacion en bd                      
            
            await reply.status(HttpStatus.OK).send({msg: "Sucursal guardada"});   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({err:error});  // error interno de servidor
        }        
    });


    done();
}