import { HttpStatus } from "../../HttpStatus";

export default function (fastify, opts, done) {      
    
    // test get
    fastify.get('/', async (request, reply) => {
        
        try {
            
            reply.status(HttpStatus.OK).send({msg:"Get servicio"});   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);  // error interno de servidor
        }
    });

    done();
}