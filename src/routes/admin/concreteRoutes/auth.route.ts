import { Usuario } from "../../../models/usuario.entity";
import { defaultConn } from "../../../core/db";
import { UserResult } from "../../resultSets/UserResult";
import { HttpStatus } from "../../HttpStatus";

export default function (fastify, opts, done) {      

    // verificamos las credenciales del usuario.
    fastify.post('/login', async (request, reply) => {
        try {
            
        const {username, password} = request.body;                        

        if(username ==="" || password ==="")                        
            reply.status(HttpStatus.BAD_REQUEST).send({msg:"Campos vacios"});   // estatus BadRequest
        
        const usuarioRepo = await defaultConn.getRepository(Usuario); // obtenemos el repositorio correspondiente

        let userResult:UserResult = await usuarioRepo.findOne({ 
            select:["idu_usuario","nom_usuario","fec_alta","opc_activo", "eliminado"],
            where:{ nom_usuario:username, clv_usuario:password, eliminado:0 } 
        });
        
        if(!userResult)
            reply.status(HttpStatus.UNAUTHORIZED).send({msg:"Accesso denegado"});   // estatus Unauthorized        

        userResult.token = fastify.jwt.sign({username,password}, {expiresIn:'1m'}); // generamos el token        

        await reply.status(HttpStatus.OK).send(userResult);   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({err:error});  // error interno de servidor
        }
    });
  
    fastify.post('/registrar', async (request, reply) => {

        try {

            let usuario:Usuario = { ...request.body };            
            let usuarioRepo = await defaultConn.getRepository(Usuario); //obtenemos el repositorio correspondiente            

            const userSaved:Usuario = await usuarioRepo.save(usuario);    // guardamos la informacion en bd            
            const {nom_usuario,clv_usuario} = userSaved;            

            let userResult:UserResult = { ...userSaved };   

            userResult.token = fastify.jwt.sign({ nom_usuario, clv_usuario}, {expiresIn:'1m'}); // generamos el token

            await reply.status(HttpStatus.OK).send(userResult);   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({err:error});  // error interno de servidor
        }        
    });


    fastify.get(
        "/jwtAccess",
        {
          preValidation: [fastify.authenticate]
        }, 
        async function(request, reply) {
            await reply.status(HttpStatus.OK).send({msg:"Autenticado"});
        });

    done();
}