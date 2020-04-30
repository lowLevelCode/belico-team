import { Usuario } from "../../../models/usuario.entity";
import { defaultConn } from "../../../core/db";
import { UserResult } from "../../resultSets/UserResult";

export default function (fastify, opts, done) {      

    // verificamos las credenciales del usuario.
    fastify.post('/login', async (request, reply) => {

        const {username, password} = request.body;        

        if(username ==="" && password ==="")
            reply.status(400).send({msg:"Campos vacios"});   // estatus BadRequest
        
        const usuarioRepo = await defaultConn.getRepository(Usuario); // obtenemos el repositorio correspondiente
        const user = await usuarioRepo.findOne({ 
            select:["idu_usuario","nom_usuario","fec_alta","opc_activo", "eliminado"],
            where:{ nom_usuario:username, clv_usuario:password, eliminado:0 } 
        });
        
        if(!user)
            reply.status(401).send({msg:"Accesso denegado"});   // estatus Unauthorized

        let userResult = new UserResult();
        Object.assign(userResult, user);   // mapeamos el resultset            

        userResult.token = fastify.jwt.sign({username,password}, {expiresIn:86400}); // generamos el token

        await reply.status(200).send({userResult});   // estatus Ok
    });
  
    fastify.post('/registrar', async (request, reply) => {
        try {

            let usuario = new Usuario();    // creamos entity o DAO
            let userResult = new UserResult();

            let usuarioRepo = await defaultConn.getRepository(Usuario); //obtenemos el repositorio correspondiente

            Object.assign(usuario, request.body);   // asignamos el objeto que llega en el request

            const userSaved:Usuario = await usuarioRepo.save(usuario);    // guardamos la informacion en bd

            Object.assign(userResult, userSaved);   // mapeamos el resultset            

            const {nom_usuario,clv_usuario} = userSaved;            

            userResult.token = fastify.jwt.sign({ nom_usuario, clv_usuario}, {expiresIn:86400}); // generamos el token

            await reply.status(200).send({userResult});   // estatus Ok

        } catch (error) {
            reply.status(500).send(error);  // error interno de servidor
        }

        //await reply.status(200).send("login");   // estatus Ok
    });


    fastify.get(
        "/jwtAccess",
        {
          preValidation: [fastify.authenticate]
        }, 
        async function(request, reply) {
          return "request.userasd" 
        });

    done();
}